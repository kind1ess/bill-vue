import service from './service'
import BASE_URL from './baseUrl'

const baseUrl = `${BASE_URL}/api/check`

const checkApi = {}

checkApi.findAllCheckPreview = () => {
    return service({
        url:`${baseUrl}/findAllCheckPreview`,
        method:'get'
    })
}

checkApi.findAllCheckPreviewPageBy = (page,size) => {
    return service({
        url:`${baseUrl}/findAllCheckPreview/${page}/${size}`,
        method:'get'
    })
}

checkApi.findCheckPreviewByStatusId = (statusId) => {
    return service({
        url:`${baseUrl}/findCheckPreviewByStatusId/${statusId}`,
        method:'get'
    })
}

checkApi.findCheckPreviewByStatusIdPageBy = (statusId,page,size) => {
    return service({
        url:`${baseUrl}/findCheckPreviewByStatusId/${statusId}/${page}/${size}`,
        method:'get'
    })
}

checkApi.findCheckVoById = (id) => {
    return service({
        url:`${baseUrl}/findCheckVoById/${id}`,
        method:'get'
    })
}

checkApi.generateBillCheck = (billParams) => {
    return service({
        url:`${baseUrl}/generateBillCheck`,
        data:JSON.stringify(billParams),
        method:'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
    })
}

checkApi.getCount = () => {
    return service({
        url:`${baseUrl}/getCount`,
        method:'get'
    })
}

checkApi.getCountBy = (statusId) => {
    return service({
        url:`${baseUrl}/getCount/${statusId}`,
        method:'get'
    })
}

export default checkApi