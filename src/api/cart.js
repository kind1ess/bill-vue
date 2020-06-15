import BASE_URL from './baseUrl'
import service from './service'

const baseUrl = "/api/cart"

const cartApi = {}

cartApi.addToCart = cartParams => {
    return service({
        url:`${BASE_URL}${baseUrl}/addToCart`,
        data:cartParams,
        method:'post'
    })
}

cartApi.getCartList = () => {
    return service({
        url:`${BASE_URL}${baseUrl}/getCartList`,
        method:'get'
    })
}

cartApi.deleteCarts = deleteCartParams => {
    // console.log("?????",JSON.stringify(deleteCartParams))
    return service({
        url:`${BASE_URL}${baseUrl}/deleteCarts`,
        data:JSON.stringify(deleteCartParams),
        method:'delete',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
    })
}
export default cartApi