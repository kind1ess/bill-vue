import BASE_URL from './baseUrl'
import service from './service'

const baseUrl = '/api/admin'

const adminApi = {}

adminApi.login = loginParams => {
    return service({
        url:`${BASE_URL}${baseUrl}/login`,
        data:loginParams,
        method:'post'
    })
}

adminApi.getAdminProfile = () => {
    return service({
        url:`${BASE_URL}${baseUrl}/getAdminProfile`,
        method:'get'
    })
}

adminApi.getAllAdminPreview = () => {
    return service({
        url:`${BASE_URL}${baseUrl}/getAllAdminPreview`,
        method:'get'
    })
}

adminApi.addAdmin = staff => {
    return service({
        url:`${BASE_URL}${baseUrl}/addAdmin`,
        data:staff,
        method:'post'
    })
}

adminApi.adminLogout = () => {
    return service({
        url:`${BASE_URL}${baseUrl}/adminLogout`,
        method:'post'
    })
}

adminApi.findAdminPreviewByDepartmentId = (departmentId) => {
    return service({
        url:`${BASE_URL}${baseUrl}/findAdminPreviewByDepartmentId/${departmentId}`,
        method:'get'
    })
}

adminApi.deleteAdminById = (staffId) => {
    return service({
        url:`${BASE_URL}${baseUrl}/deleteAdminById/${staffId}`,
        method:'delete'
    })
}

adminApi.findAllAdminVo = () => {
    return service({
        url:`${BASE_URL}${baseUrl}/findAllAdminVo`,
        method:'get'
    })
}
export default adminApi