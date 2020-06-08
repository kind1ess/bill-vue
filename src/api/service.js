import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import router from '../router'



const service = axios.create({
    timeout: 10000,
    withCredentials: true
})

function setTokenToHeader(config) {
    const token = store.getters.token
    if (token) {
        config.headers['Authorization'] = token
    }
}

service.interceptors.request.use(
    config => {
        setTokenToHeader(config)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.log(error.response.data.code);

        if (error.response.data.code != 200) {
            Message.error(error.response.data.message)
        }
        if (error.response.data.code == 401) {
            console.log(error.response.data.message);
            // router.replace("/")
            if (!store.getters.isAdmin) {
                store.dispatch('reloginPreOpration')
                store.dispatch('setCallLoginDialog', true)
            }else{
                store.dispatch('reloginPreOpration')
                router.replace("/adminLogin")
            }
        }
        if (error.response.data.code == 403&&store.getters.isAdmin){
            router.push({path:"/dashboard/403"})
        }
        return Promise.reject(error)
    }
)

export default service