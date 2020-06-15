import service from './service'
import BASE_URL from './baseUrl'

const baseUrl = `${BASE_URL}/api/log`

const logApi = {}

logApi.pageBy = (page,size) => {
    return service({
        url:`${baseUrl}/pageBy/${page}/${size}`,
        method:'get'
    })
}


export default logApi;