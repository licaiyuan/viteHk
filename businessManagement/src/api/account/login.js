import http from '@/lib/http.js'
export function configRequest() {
    return http.post('/bg/account-login/config')

}
export function userInform(data) {
    return http.post('/bg/account-login/valid', data)
}

export function meauListData() {
    return http.post('/bg/menu/get_menu',)
}