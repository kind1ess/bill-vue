import service from './service'
import BASE_URL from './baseUrl'

const baseUrl = '/api/order'
const orderApi = {}

orderApi.addToOrder = (orderParams) => {
    return service({
        url:`${BASE_URL}${baseUrl}/addToOrder`,
        data:JSON.stringify(orderParams),
        method:'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
    })
}

orderApi.findOrderVo = (billOrderId) => {
    return service({
        url:`${BASE_URL}${baseUrl}/findOrderVo/${billOrderId}`,
        method:'get'
    })
}

orderApi.findOrderTitleVo = () => {
    return service({
        url:`${BASE_URL}${baseUrl}/findOrderTitleVo`,
        method:'get'
    })
}

// orderApi.findAll = () => {
//     return service({
//         url:`${BASE_URL}${baseUrl}/findAllOrderTitleVo`,
//         method:'get'
//     })
// }

orderApi.getCount = () => {
    return service({
        url:`${BASE_URL}${baseUrl}/getCount`,
        method:'get'
    })
}

orderApi.getCountBy = (statusId) => {
    return service({
        url:`${BASE_URL}${baseUrl}/getCount/${statusId}`,
        method:'get'
    })
}

orderApi.getCountByStatusId = (statusId) => {
    return service({
        url:`${BASE_URL}${baseUrl}/getCount/${statusId}`,
        method:'get'
    })
}

orderApi.findAllOrderTitleVo = (page,size) => {
    return service({
        url:`${BASE_URL}${baseUrl}/findAllOrderTitleVo/${page}/${size}`,
        method:'get'
    })
}

orderApi.verifyOrder = (verifyParams) => {
    return service({
        url:`${BASE_URL}${baseUrl}/verifyOrder`,
        data:verifyParams,
        method:'post'
    })
}

orderApi.findOrderPreviewVoByStatusId = (statusId) => {
    return service({
        url:`${BASE_URL}${baseUrl}/findOrderPreviewVoByStatusId/${statusId}`,
        method:'get'
    })
}

orderApi.findOrderPreviewVoByStatusIdPageBy = (statusId,page,size) => {
    return service({
        url:`${BASE_URL}${baseUrl}/findOrderPreviewVoByStatusId/${statusId}/${page}/${size}`,
        method:'get'
    })
}
export default orderApi