export const Login = (user) => {
    return({
        type: 'LOGIN',
        payload: user,
    })
}
export const Logout = () => {
    return({
        type: 'LOGOUT',
        payload: null,
    })
}
export const getUser = (user) => {
    return({
        type: 'USER',
        payload: user,
    })
}
export const BoardUpdate = (data) => {
    return({
        type: 'BOARD_UPDATE',
        payload:data
    })
}