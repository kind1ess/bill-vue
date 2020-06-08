import service from './service'
import BASE_URL from './baseUrl'

const baseUrl = '/api/invoice'

const invoiceApi = {}

invoiceApi.findAllInvoicePreviewVoPageBy = (page,size) => {
    return service({
        url:`${BASE_URL}${baseUrl}/findAllInvoicePreviewVo/${page}/${size}`,
        method:'get'
    })
}

invoiceApi.findAllInvoicePreviewVo = () => {
    return service({
        url:`${BASE_URL}${baseUrl}/findAllInvoicePreviewVo`,
        method:'get'
    })
}

invoiceApi.getCount = () => {
    return service({
        url:`${BASE_URL}${baseUrl}/getCount`,
        method:'get'
    })
}

invoiceApi.findInvoiceVoById = (billId) => {
    return service({
        url:`${BASE_URL}${baseUrl}/findInvoiceVoById/${billId}`,
        method:'get'
    })
}

invoiceApi.generateInvoiceList = (billParams) => {
    return service({
        url:`${BASE_URL}${baseUrl}/generateInvoiceList`,
        data:JSON.stringify(billParams),
        method:'post',
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export default invoiceApi