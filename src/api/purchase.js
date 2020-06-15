import service from './service'
import BASE_URL from './baseUrl'

const baseUrl = `${BASE_URL}/api/purchase`

const purchaseApi = {}

purchaseApi.findAllPurchasePreview = () => {
    return service({
        url: `${baseUrl}/findAllPurchasePreview`,
        method: 'get'
    })
}

purchaseApi.findAllPurchasePreviewPageBy = (page, size) => {
    return service({
        url: `${baseUrl}/findAllPurchasePreview/${page}/${size}`,
        method: 'get'
    })
}

purchaseApi.findAllPurchasePreviewByStatusId = (statusId) => {
    return service({
        url: `${baseUrl}/findAllPurchasePreview/${statusId}`,
        method: 'get'
    })
}

purchaseApi.findAllPurchasePreviewByStatusIdPageBy = (statusId, page, size) => {
    return service({
        url: `${baseUrl}/findAllPurchasePreview/${statusId}/${page}/${size}`,
        method: 'get'
    })
}

purchaseApi.findPurchaseVoById = (id) => {
    return service({
        url: `${baseUrl}/findPurchaseVoById/${id}`,
        method: 'get'
    })
}

purchaseApi.generatePurchase = (purchaseParams) => {
    return service({
        url: `${baseUrl}/generatePurchase`,
        data: JSON.stringify(purchaseParams),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method: 'post'
    })
}

purchaseApi.getCount = () => {
    return service({
        url: `${baseUrl}/getCount`,
        method: 'get'
    })
}

purchaseApi.getCountBy = (statusId) => {
    return service({
        url: `${baseUrl}/getCount/${statusId}`,
        method: 'get'
    })
}

export default purchaseApi