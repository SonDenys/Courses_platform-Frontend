import { Registry, is_allowed_role, is_not_allowed_role } from "../RBAC";


export const ROLE_REGISTRY = new Registry()
ROLE_REGISTRY.add_role("user")
ROLE_REGISTRY.add_role("unit", ["user"])
ROLE_REGISTRY.add_role("store_staff", ["unit"])
ROLE_REGISTRY.add_role("store_admin", ["store_staff"])
ROLE_REGISTRY.add_role("company_admin", ["store_admin"])
ROLE_REGISTRY.add_role("admin", ["company_admin"])
ROLE_REGISTRY.add_role("super_admin", ["admin"])
ROLE_REGISTRY.add_role("*", [])


export const SUPER_ADMIN_ACCESS = ROLE_REGISTRY.get_accessible_roles("super_admin")
export const ADMIN_ACCESS = ROLE_REGISTRY.get_accessible_roles("admin")
export const COMPANY_ADMIN_ACCESS = ROLE_REGISTRY.get_accessible_roles("company_admin")
export const STORE_ADMIN_ACCESS = ROLE_REGISTRY.get_accessible_roles("store_admin")
export const STORE_STAFF_ACCESS = ROLE_REGISTRY.get_accessible_roles("store_staff")
export const UNIT_ACCESS = ROLE_REGISTRY.get_accessible_roles("unit")
export const USER_ACCESS = ROLE_REGISTRY.get_accessible_roles("user")

export let SELECTION_DATA_LOADED = false


export function set_selection_data_loaded(flag){
    SELECTION_DATA_LOADED = flag
}

export function is_selection_data_loaded(){
    return SELECTION_DATA_LOADED
}


export function is_company_selectable(scope){
    return is_allowed_role(scope, ADMIN_ACCESS)
}

export function is_store_selectable(scope){
    return is_allowed_role(scope, COMPANY_ADMIN_ACCESS)
}

export function is_store_staff_selectable(scope){
    return is_allowed_role(scope, STORE_ADMIN_ACCESS)
}

export function is_scope_in_list(scope, access_scope_list: string[]) {
    return (access_scope_list || []).indexOf(scope) !== -1
}


