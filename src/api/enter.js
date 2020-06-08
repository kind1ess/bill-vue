import service from './service'
import BASE_URL from './baseUrl'

const baseUrl = `${BASE_URL}/api/enter`

const enterApi = {}

enterApi.findAllEnterPreview = () => {
    return service({
        url:`${baseUrl}/findAllEnterPreview`,
        method:'get'
    })
}

enterApi.findEnterVoById = (id) => {
    return service({
        url:`${baseUrl}/findEnterVoById/${id}`,
        method:'get'
    })
}

enterApi.generateBillEnter = (billParams) => {
    return service({
        url:`${baseUrl}/generateBillEnter`,
        data:JSON.stringify(billParams),
        method:'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
    })
}

export default enterApi