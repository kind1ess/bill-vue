import userApi from '../../api/user'
import router from '../../router'
import { Message } from 'element-ui'
import adminApi from '../../api/admin'

const user = {
    state: {
        token: null,
        user: {},
        admin: {},
        loginStatus: false,
        callLoginDialog: false,
        isAdmin: false
    },
    // getters:{
    //     token: state => state.token,
    //     user: state => state.user,
    //     loginStatus: state => state.loginStatus,
    //     callLoginDialog: state => state.callLoginDialog
    // },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        CLEAR_TOKEN: state => {
            state.token = null
        },
        SET_USER: (state, user) => {
            state.user = user
            state.isAdmin = false
        },
        SET_LOGINSTATUS: (state, loginStatus) => {
            state.loginStatus = loginStatus
        },
        CLEAR_USER: state => {
            state.user = {}
        },
        SET_CALLLOGINDIALOG: (state, callLoginDialog) => {
            state.callLoginDialog = callLoginDialog
        },
        SET_ADMIN: (state, admin) => {
            state.admin = admin
            state.isAdmin = true
        },
        CLEAR_ADMIN: state => {
            state.admin = {}
            state.isAdmin = false
        }
    },
    actions: {
        loadUser({ commit }) {
            return new Promise((resolve, reject) => {
                userApi.getProfile().then(response => {
                    console.log(response)
                    const user = response.data.data
                    console.log(user)
                    commit('SET_USER', user)
                    router.go(0)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        login({ commit }, loginParams) {
            console.log(loginParams);
            return new Promise((resolve, reject) => {
                userApi.login(loginParams).then(response => {
                    const token = response.data.data.token
                    commit('SET_TOKEN', token)
                    commit('SET_LOGINSTATUS', true)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                userApi.logout().then(response => {
                    commit('CLEAR_TOKEN')
                    commit('CLEAR_USER')
                    commit('SET_LOGINSTATUS', false)
                    router.push({ path: "/" })
                    Message.success("欢迎下次光临！")
                    resolve()
                }).catch(() => {
                    reject()
                })
            })
        },
        setCallLoginDialog({ commit }, callLoginDialog) {
            commit('SET_CALLLOGINDIALOG', callLoginDialog)
        },
        updateUser({ commit }, updateParams) {
            return new Promise((resolve, reject) => {
                userApi.updateUser(updateParams).then(response => {
                    router.push({ path: "/" })
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        adminLogin({ commit }, loginParams) {
            return new Promise((resolve, reject) => {
                adminApi.login(loginParams).then(response => {
                    console.log(response);

                    const adminToken = response.data.data.token
                    console.log(response.data.data.token);

                    commit('SET_TOKEN', adminToken)
                    commit('SET_LOGINSTATUS', true)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        adminLogout({ commit }) {
            return new Promise((resolve, reject) => {
                adminApi.adminLogout().then(response => {
                    commit('CLEAR_TOKEN')
                    commit('CLEAR_ADMIN')
                    commit('SET_LOGINSTATUS', false)
                    commit('SET_ISADMIN', false)
                    router.replace("/adminLogin")
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        loadAdmin({ commit }) {
            return new Promise((resolve, reject) => {
                adminApi.getAdminProfile().then(response => {
                    const admin = response.data.data
                    commit('SET_ADMIN', admin)
                    router.push({ path: "/dashboard" })
                    Message.info(`您的部门是${admin.departmentName}，您可以${admin.position}`)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        clearAdmin({commit}){
            commit('CLEAR_ADMIN')
        },
        setLoginStatus({commit},status){
            commit('SET_LOGINSTATUS',status)
        },
        reloginPreOpration({ commit }) {
            commit('CLEAR_TOKEN')
            commit('CLEAR_USER')
            commit('CLEAR_ADMIN')
            commit('SET_LOGINSTATUS', false)
            commit('SET_ISADMIN', false)
        }
    }
}

export default user