

export class defaultdict {
    constructor(defaultInit) {
        return new Proxy({}, {
            get: (target, name) => name in target ?
                target[name] :
                (target[name] = typeof defaultInit === 'function' ?
                    new defaultInit().valueOf() :
                    defaultInit)
        })
    }
}


export class Registry {
    _roles = new defaultdict(Set) // {} // {k: new Set()}
    _resources = new defaultdict(Set) // {k: new Set()}
    _allowed = {}
    _denied = {}
    _denial_only_roles = new Set() // new Set
    _children: any = new defaultdict(Set) // {k: new Set()}
    _operations = {}
    _children_cache = {}

    // self._roles = defaultdict(set)
    // self._resources = defaultdict(set)
    // self._allowed = {}
    // self._denied = {}
    // self._denial_only_roles = set()
    // self._children = defaultdict(set)
    // self._operations = {}
    // self._children_cache = {}    

    // constructor() {

    // }

    // def add_role(self, role, parents=[]):
    //     self._roles[role].update(parents)
    //     for p in parents:
    //         self._children[p].add(role)

    //     if not parents or self._roles_are_deny_only(parents):
    //         self._denial_only_roles.add(role)

    update(x: Set<any>, new_list: any = []) {
        for (let k in (new_list || [])) {
            x.add(new_list[k])
        }
        return x
    }

    add_role(role, parents: any[] = []) {
        this.update(this._roles[role], parents)

        parents.forEach(p => {
            this._children[p].add(role)
        })


        if (Object.keys(parents).length || this._roles_are_deny_only(parents)) {
            this._denial_only_roles.add(role)
        }
    }


    _roles_are_deny_only(roles: any[] = []) {
        for (let k in roles) {
            const r = roles[k]
            if (this._denial_only_roles.has(r) === false) {
                return false
            }
        }
        return true
    }


    add_resources(resources: any, parents = []) {
        if (typeof (resources) === "string") {
            resources = [resources]
        }
        for (let k in (resources || [])) {
            this._add_resource(resources[k], parents)
        }
    }

    _add_resource(resource, parents = []) {
        this.update(this._resources[resource], parents)
    }
    // def _add_resource(self, resource, parents = []):
    //     self._resources[resource].update(parents)    

    add_operations(operations: string[]) {
        if (typeof (operations) === "string") {
            operations = [operations]
        }
        for (let k in operations) {
            const op: any = operations[k]
            this._operations[op] = op
        }
    }

    get_operations(operation) {
        if (operation == '*') {
            return Object.keys(this._operations)
        }
        return this._operations[operation]
    }

    allow(role, operations, resources, assertion = null) {

        if (typeof (operations) === "string") {
            operations = [operations]
        }

        if (typeof (resources) === "string") {
            resources = [resources]
        }

        for (let op_idx in operations) {
            for (let res_idx in resources) {
                this._allow(role, operations[op_idx], resources[res_idx], assertion)
            }
        }

    }

    _allow(role: string, operation: string, resource: string, assertion = null) {
        this._allowed[[role, operation, resource].toString()] = true

        //     # since we just allowed a permission, role and any children aren't
        //     # denied-only
        //     for r in itertools.chain([role], get_family(self._children, role)):
        //         self._denial_only_roles.discard(r)


    }

    is_allowed(role, operations, resources, check_allowed = true, ...assertion_kwargs) {
        if (typeof (operations) === "string") {
            operations = [operations]
        }

        if (typeof (resources) === "string") {
            resources = [resources]
        }

        for (let op_idx in operations) {
            for (let res_idx in resources) {
                const _allowed: any = this._is_allowed(role, operations[op_idx], resources[res_idx])
                if (!_allowed) {
                    return false
                }
            }
        }

        return true

    }

    _is_allowed(role, operation, resource, check_allowed = true, ...assertion_kwargs) {

        // if(!role || Object.keys(this._roles[role]).length )
        const roles: any[] = Array.from(new Set(Array.from(get_family(this._roles, role))))
        const operations: any[] = Array.from(new Set([operation, null]))
        const resources: any[] = Array.from(new Set(Array.from(get_family(this._resources, resource))))

        let is_allowd = false

        const permisions_list = iter_product(roles, operations, resources)
        for (const k in permisions_list) {
            const permission = permisions_list[k].toString()
            const denied_permision = this._denied[permission]

            if (denied_permision) {
                return false
            }
            const allowd_permission = this._allowed[permission]

            if (check_allowed === true && allowd_permission) {
                is_allowd = true
            }

        }

        return is_allowd === true

    }

    get_inaccessible_roles(role_name) {
        const new_set: any = []
        for (const parent of this.traverse_parents(role_name)) {
            new_set.push(parent)
        }
        return Array.from(new Set(new_set))
        // return list(set([x for x in self.traverse_parents(role_name)]))
    }

    get_accessible_roles(role_name) {
        const new_set: any = []
        for (const child of this.traverse_children(role_name)) {
            new_set.push(child)
        }
        return Array.from(new Set(new_set))
        // return list(set([x for x in self.traverse_parents(role_name)]))
    }

    *traverse_parents(current) {
        const roles = this._roles[current] || []

        for (let k in roles) {
            const parent = roles[k] || []
            yield parent
            // const g_roles = self.traverse_parents(parent)
            for (const grandparent of this.traverse_parents(parent)) {
                yield grandparent
            }

        }

    }
    *traverse_children(current) {
        const roles = this._roles[current] || []

        for (let k in roles) {
            const child = roles[k] || []
            yield child
            for (const grandchild of this.traverse_children(child)) {
                yield grandchild
            }

        }
    }

}


export function* get_family(all_parents, current) {
    yield current
    for (const parent of get_parents(all_parents, current))
        yield parent
    yield null
}


export function* get_parents(all_parents, current) {
    for (const k in (all_parents[current] || [])) {
        const parent = all_parents[current][k]
        yield all_parents[current][k]
        const grandparents = get_parents(all_parents, parent) || []
        for (const q in grandparents) {
            yield grandparents[q]
        }
    }
}

export function* get_children(all_children, current) {
    for (const k in (all_children[current] || [])) {
        const child = all_children[current][k]
        yield all_children[current][k]
        const grandchildren = get_children(all_children, child) || []
        for (const q in grandchildren) {
            yield grandchildren[q]
        }
    }
}

export function* iter_product2(...iterables) {
    if (iterables.length === 0) { return; }
    // make a list of iterators from the iterables
    const iterators = iterables.map(it => it[Symbol.iterator]());
    const results = iterators.map(it => it.next());
    if (results.some(r => r.done)) {
        throw new Error("Input contains an empty iterator.");
    }

    for (let i = 0; ;) {
        if (results[i].done) {
            // reset the current iterator
            iterators[i] = iterables[i][Symbol.iterator]();
            results[i] = iterators[i].next();
            // advance, and exit if we've reached the end
            if (++i >= iterators.length) { return; }
        } else {
            yield results.map(({ value }) => value) as any;
            i = 0;
        }
        results[i] = iterators[i].next();
    }
}

function iter_product(...args) {
    // var args = Array.prototype.slice.call(arguments); // makes array from arguments
    return args.reduce(function tl(accumulator, value) {
        var tmp: any[] = [];
        accumulator.forEach(function (a0) {
            value.forEach(function (a1) {
                tmp.push((a0).concat(a1));
            });
        });
        return tmp;
    }, [[]]);
}


const ROLE_REGISTRY = new Registry()

export function get_accessible_roles(role_name) {
    return ROLE_REGISTRY.get_accessible_roles(role_name)
}


export function get_inaccessible_roles(role_name) {
    return ROLE_REGISTRY.get_inaccessible_roles(role_name)
}

ROLE_REGISTRY.add_role("user")
ROLE_REGISTRY.add_role("unit", ["user"])
ROLE_REGISTRY.add_role("store_staff", ["unit"])
ROLE_REGISTRY.add_role("store_admin", ["store_staff"])
ROLE_REGISTRY.add_role("company_admin", ["store_admin"])
ROLE_REGISTRY.add_role("admin", ["company_admin"])
ROLE_REGISTRY.add_role("super_admin", ["admin"])
ROLE_REGISTRY.add_role("*", [])


const USER_ACCESS = get_accessible_roles("user")
const UNIT_ACCESS = get_accessible_roles("unit")
const ADMIN_ACCESS = get_accessible_roles("admin")
const STORE_STAFF_ACCESS = get_accessible_roles("store_staff")
const STORE_ADMIN_ACCESS = get_accessible_roles("store_admin")
const COMPANY_ADMIN_ACCESS = get_accessible_roles("company_admin")
const SUPER_ADMIN_ACCESS = get_accessible_roles("super_admin")
const ALL_READ_ACCESS = get_accessible_roles("*")


console.log(USER_ACCESS)
console.log(UNIT_ACCESS)
console.log(ADMIN_ACCESS)
console.log(ROLE_REGISTRY)