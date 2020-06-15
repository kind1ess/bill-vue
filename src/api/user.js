import BASE_URL from './baseUrl'
import service from './service'

const baseUrl = "/api/user"

const userApi = {}

userApi.login = loginParams => {
    return service({
        url: `${BASE_URL}${baseUrl}/login`,
        data:loginParams,
        method:'post'
    })
}

userApi.logout = () => {
    return service({
        url: `${BASE_URL}${baseUrl}/logout`,
        method:'post'
    })
}

userApi.signUp = signUpParams => {
    return service({
        url: `${BASE_URL}${baseUrl}/signUp`,
        data:signUpParams,
        method:'post'
    })
}

userApi.getProfile = () => {
    return service({
        url: `${BASE_URL}${baseUrl}/getUserProfile`,
        method:'get'
    })
}

userApi.updateUser = (updateParams) => {
    return service({
        url: `${BASE_URL}${baseUrl}/updateUser`,
        data:updateParams,
        method:"put"
    })
}

export default userApi