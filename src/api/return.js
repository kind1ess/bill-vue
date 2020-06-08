import service from './service'
import BASE_URL from './baseUrl'

const baseUrl = `${BASE_URL}/api/return`

const returnApi = {}

returnApi.generateBillReturn = (orderId) => {
    return service({
        url:`${baseUrl}/generateBillReturn/${orderId}`,
        method:'post'
    })
}

returnApi.findReturnVoById = (id) => {
    return service({
        url:`${baseUrl}/findReturnVoById/${id}`,
        method:'get'
    })
}

returnApi.findAllReturnPreviewVoPageBy = (page,size) => {
    return service({
        url:`${baseUrl}/findAllReturnPreviewVo/${page}/${size}`,
        method:'get'
    })
}

returnApi.findAllReturnPreviewVo = () => {
    return service({
        url:`${baseUrl}/findAllReturnPreviewVo`,
        method:'get'
    })
}

returnApi.findReturnPreviewVoByStatusIdPageBy = (statusId,page,size) => {
    return service({
        url:`${baseUrl}/findReturnPreviewVoByStatusId/${statusId}/${page}/${size}`,
        method:'get'
    })
}

returnApi.findReturnPreviewVoByStatusId = (statusId) => {
    return service({
        url:`${baseUrl}/findReturnPreviewVoByStatusId/${statusId}`,
        method:'get'
    })
}

returnApi.verifyBillReturn = (verifyParams) => {
    return service({
        url:`${baseUrl}/verifyBillReturn`,
        data:verifyParams,
        method:'put'
    })
}

returnApi.findReturnPreviewByUserId = () => {
    return service({
        url:`${baseUrl}/findReturnPreviewVoByUserId`,
        method:'get'
    })
}

returnApi.getCount = () => {
    return service({
        url:`${baseUrl}/getCount`,
        method:'get'
    })
}

returnApi.getCountBy = (statusId) => {
    return service({
        url:`${baseUrl}/getCount/${statusId}`,
        method:'get'
    })
}

export default returnApi