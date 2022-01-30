

export function accessVerifier(current_role, target_role) {

    let ret = {
        companySelect: 'auto',
        storeSelect: 'disabled'
    }


    if (current_role === 'super_admin') {
        if (target_role === 'super_admin') {
            return ret
        } else if (target_role === 'admin') {
            return ret
        } else if (target_role === 'company_admin') {
            return { companySelect: 'enabled', storeSelect: 'disabled' }
        } else if (target_role === 'store_admin') {
            return { companySelect: 'enabled', storeSelect: 'enabled' }
        } else {
            // for others
            return { companySelect: 'enabled', storeSelect: 'enabled' }
        }


    } else if (current_role === 'admin') {
        if (target_role === 'admin') {
            return ret
        } else if (target_role === 'company_admin') {
            return { companySelect: 'enabled', storeSelect: 'disabled' }
        } else if (target_role === 'store_admin') {
            return { companySelect: 'enabled', storeSelect: 'enabled' }
        } else {
            // for others
            return { companySelect: 'enabled', storeSelect: 'enabled' }
        }


    } else if (current_role === 'company_admin') {
        if (target_role === 'company_admin') {
            return { companySelect: 'auto', storeSelect: 'disabled' }
        } else if (target_role === 'store_admin') {
            return { companySelect: 'auto', storeSelect: 'enabled' }
        } else {
            // for others
            return { companySelect: 'auto', storeSelect: 'enabled' }
        }


    } else if (current_role === 'store_admin') {
        if (target_role === 'store_admin') {
            return { companySelect: 'auto', storeSelect: 'auto' }
        } else { 
            // for others
            return { companySelect: 'auto', storeSelect: 'auto' }
        }
    }
}