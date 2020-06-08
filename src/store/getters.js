const getters = {
    token: state => state.user.token,
    user: state => state.user.user,
    loginStatus: state => state.user.loginStatus,
    callLoginDialog: state => state.user.callLoginDialog,
    admin: state => state.user.admin,
    isAdmin: state => state.user.isAdmin
}
export default getters