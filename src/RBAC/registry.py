import itertools
import functools
from collections import defaultdict

class Registry:
    """The registry of access control list."""

    def __init__(self):
        self._roles = defaultdict(set)
        self._resources = defaultdict(set)
        self._allowed = {}
        self._denied = {}
        self._denial_only_roles = set()
        self._children = defaultdict(set)
        self._operations = {}
        self._children_cache = {}

    def add_role(self, role, parents=[]):
#         self._roles.setdefault(role, set())
        self._roles[role].update(parents)
        for p in parents:
#             self._children.setdefault(p, set())
            self._children[p].add(role)

        if not parents or self._roles_are_deny_only(parents):
            self._denial_only_roles.add(role)

    def add_resource(self, resources, parents=[]):
        if isinstance(resources, str):
            resources = [resources]
            
        for res in resources:
            self._add_resource(res, parents)
            
    def add_operations(self, operations):
        if isinstance(operations, str):
            operations = [operations]
        for op in operations:
            self._operations[op] = op
        
    def get_operations(self, operation):
        if operation == '*':
            return list(self._operations.keys())
        
        return self._operations.get(operation)
            

    def _add_resource(self, resource, parents=[]):
#         self._resources.setdefault(resource, set())
        self._resources[resource].update(parents)
        
    def allow(self, role, operations, resources, assertion=None):
        if isinstance(operations, str):
            operations = [operations]

        if isinstance(resources, str):
            resources = [resources]

        for op in operations:
            for res in resources:
                self._allow(role, op, res, assertion)
            
        
    def _allow(self, role, operation, resource, assertion=None):
        assert not role or role in self._roles
        assert not resource or resource in self._resources
        self._allowed[role, operation, resource] = assertion

        # since we just allowed a permission, role and any children aren't
        # denied-only
        for r in itertools.chain([role], get_family(self._children, role)):
            self._denial_only_roles.discard(r)


    def deny(self, role, operations, resources, assertion=None):
        if isinstance(operations, str):
            operations = [operations]

        if isinstance(resources, str):
            resources = [resources]

        for op in operations:
            for res in resources:
                self._deny(role, op, res, assertion)
                
            
    def _deny(self, role, operation, resource, assertion=None):
        assert not role or role in self._roles
        assert not resource or resource in self._resources
        self._denied[role, operation, resource] = assertion

    def is_allowed(self, role, operations, resources, check_allowed=True,
                   **assertion_kwargs):
        
        if isinstance(operations, str):
            operations = [operations]

        if isinstance(resources, str):
            resources = [resources]
            
        for operation in operations:
            for resource in resources:
                _allowed = self._is_allowed(role, operation, resource)
                if not _allowed:
                    return False
        return True


        
    def _is_allowed(self, role, operation, resource, check_allowed=True,
                   **assertion_kwargs):
        assert not role or role in self._roles
        assert not resource or resource in self._resources

        roles = set(get_family(self._roles, role))
        operations = {None, operation}
        resources = set(get_family(self._resources, resource))

        def DefaultAssertion(*args, **kwargs):
            return True

        is_allowed = None
        default_assertion = DefaultAssertion

        for permission in itertools.product(roles, operations, resources):
            if permission in self._denied:
                assertion = self._denied[permission] or default_assertion
                if assertion(self, role, operation, resource,
                             **assertion_kwargs):
                    return False  # denied by rule immediately

            if check_allowed and permission in self._allowed:
                assertion = self._allowed[permission] or default_assertion
                if assertion(self, role, operation, resource,
                             **assertion_kwargs):
                    is_allowed = True  # allowed by rule

        return is_allowed == True 

    def is_any_allowed(self, roles, operation, resource, **assertion_kwargs):
        """Check the permission with many roles."""
        if isinstance(roles, str):
            roles = [roles]
        
        is_allowed = False  # no matching rules
        for i, role in enumerate(roles):
            # if access not yet allowed and all remaining roles could
            # only deny access, short-circuit and return False
            if not is_allowed and self._roles_are_deny_only(roles[i:]):
                return False

            check_allowed = not is_allowed

            # if another role gave access,
            # don't bother checking if this one is allowed
            is_current_allowed = self.is_allowed(role, operation, resource,
                                                 check_allowed=check_allowed,
                                                 **assertion_kwargs)
            if is_current_allowed is False:
                return False  # denied by rule
            elif is_current_allowed is True:
                is_allowed = True
        return is_allowed

    def _roles_are_deny_only(self, roles):
        return all(r in self._denial_only_roles for r in roles)
    
    def get_inaccessible_roles(self, role_name):
        return list(set([x for x in self.traverse_parents(role_name)]))

    def get_accessible_roles(self, role_name):
        resp = (list(set([x for x in self.traverse_children(role_name)])) ) + [role_name]
        return resp
#         return (resp + [role_name]) if resp else resp


    def traverse_children(self, current):
        for child in self._children.get(current, []):
            yield child
            for grandchild in self.traverse_children(child):
                yield grandchild 

                
    def traverse_parents(self, current):
        for parent in self._roles.get(current, []):
            yield parent
            for grandparent in self.traverse_parents(parent):
                yield grandparent                

    def get_family(self, current):
        yield current
        for parent in self.traverse_parents(self._roles, current):
            yield parent
        yield None


def get_family(all_parents, current):
    """Iterate current object and its all parents recursively."""
    yield current
    for parent in get_parents(all_parents, current):
        yield parent
    yield None


def get_parents(all_parents, current):
    """Iterate current object's all parents."""
    for parent in all_parents.get(current, []):
        yield parent
        for grandparent in get_parents(all_parents, parent):
            yield grandparent

            
def get_children(all_children, current):
    for child in all_children.get(current, []):
        yield child
        for grandchild in get_children(all_children, child):
            yield grandchild
            
            
