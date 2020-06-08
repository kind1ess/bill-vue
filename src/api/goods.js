import BASE_URL from './baseUrl'
import service from './service'

const baseUrl = "/api/goods"

const goodsApi = {}

goodsApi.findAll = () => {
    return service({
        url: `${BASE_URL}${baseUrl}/findAll`,
        method: 'get'
    })
}

export default goodsApi