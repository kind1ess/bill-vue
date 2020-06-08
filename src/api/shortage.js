import service from './service'
import BASE_URL from './baseUrl'

const baseUrl = `${BASE_URL}/api/shortage`

const shortageApi = {}

shortageApi.findAllShortagePreviewVo = () => {
    return service({
        url:`${baseUrl}/findAllShortagePreviewVo`,
        method:'get'
    })
}

shortageApi.findAllShortagePreviewVoPageBy = (page,size) => {
    return service({
        url:`${baseUrl}/findAllShortagePreviewVo/${page}/${size}`,
        method:'get'
    })
}

shortageApi.findAllShortagePreviewVoByStatusId = (statusId) => {
    return service({
        url:`${baseUrl}/findAllShortagePreviewVo/${statusId}`,
        method:'get'
    })
}

shortageApi.findAllShortagePreviewVoByStatusIdPageBy = (statusId,page,size) => {
    return service({
        url:`${baseUrl}/findAllShortagePreviewVo/${statusId}/${page}/${size}`,
        method:'get'
    })
}

shortageApi.findShortageVoById = (id) => {
    return service({
        url:`${baseUrl}/findShortageVoById/${id}`,
        method:'get'
    })
}

shortageApi.generateShortage = (shortageParams) => {
    return service({
        url:`${baseUrl}/generateShortage`,
        data:JSON.stringify(shortageParams),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
        method:'post'
    })
}

shortageApi.getCount = () => {
    return service({
        url:`${baseUrl}/getCount`,
        method:'get'
    })
}

shortageApi.getCountByStatusId = (statusId) => {
    return service({
        url:`${baseUrl}/getCount/${statusId}`,
        method:'get'
    })
}

export default shortageApi