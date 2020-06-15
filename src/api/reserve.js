import service from './service'
import BASE_URL from './baseUrl'

const baseUrl = `${BASE_URL}/api/reserve`

const reserveApi = {}

reserveApi.findAllCount = () => {
    return service({
        url:`${baseUrl}/findAllCount`,
        method:'get'
    })
}


reserveApi.findAllCountFromUser = () => {
    return service({
        url:`${baseUrl}/findAllCountFromUser`,
        method:'get'
    })
}


export default reserveApi