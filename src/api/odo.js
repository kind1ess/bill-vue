import service from './service'
import BASE_URL from './baseUrl'

const baseUrl = "/api/odo"

const odoApi = {}

odoApi.findAllOdoPreviewVo = () => {
    return service({
        url:`${BASE_URL}${baseUrl}/findAllOdoPreviewVo`,
        method:'get'
    })
}

odoApi.findAllOdoPreviewVoPageBy = (page,size) => {
    return service({
        url:`${BASE_URL}${baseUrl}/findAllOdoPreviewVo/${page}/${size}`,
        method:'get'
    })
}

odoApi.addToOdo = (billParams) => {
    return service({
        url:`${BASE_URL}${baseUrl}/addToOdo`,
        data:JSON.stringify(billParams),
        method:'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
    })
}

odoApi.findOdoVoById = (odoId) => {
    return service({
        url:`${BASE_URL}${baseUrl}/findOdoVoById/${odoId}`,
        method:'get'
    })
}

odoApi.findOdoPreviewByStatusId = (statusId) => {
    return service({
        url:`${BASE_URL}${baseUrl}/findOdoPreviewByStatusId/${statusId}`,
        method:'get'
    })
}

odoApi.findOdoPreviewByStatusIdPageBy = (statusId,page,size) => {
    return service({
        url:`${BASE_URL}${baseUrl}/findOdoPreviewByStatusId/${statusId}/${page}/${size}`,
        method:'get'
    })
}

odoApi.getCount = () => {
    return service({
        url:`${BASE_URL}${baseUrl}/getCount`,
        method:'get'
    })
}

odoApi.getCountBy = (statusId) => {
    return service({
        url:`${BASE_URL}${baseUrl}/getCount/${statusId}`,
        method:'get'
    })
}

export default odoApi;