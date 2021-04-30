// import axios from 'axios'
import router from "@/router.js"
import { Base64 } from 'js-base64'
import axios from 'axios'
// import exitLogin from '@/utils/exit'
// import {upmBaseUrl,apiBaseUrl} from '../config/env'
// const PRODBASEURL = 'http://localhost:8080/'
const BASEURL = 'http://172.16.20.20:38000/'
// let baseURL = ''
// if (process.env.NODE_ENV === 'production') {
//   baseURL = PRODBASEURL
// }
// if (process.env.NODE_ENV === 'development') {//开发环境
//   baseURL = BASEURL
// }

axios.defaults.timeout = 50000;
// axios.defaults.withCredentials = true;// 携带cookie
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.common['H-V'] = 'DEBUG';
axios.defaults.baseURL = 'https://bgapi.dev.daaokeji.com/';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; // 判断是否为ajax请求

const header = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,HEAD,GET,PUT,POST,DELETE,PATCH',
    // 'H-V': 'DEBUG'
    // writer.Header().Add("Access-Control-Allow-Credentials", "true")
    // 'Access-Control-Allow-Credentials': '*',
    // 'Access-Control-Allow-Credentials': true
}
const postHeader = Object.assign({}, header, {
    'Content-Type': 'application/json;charset=UTF-8',

})

const formDataHeader = Object.assign({}, header, {
    'Content-Type': 'multipart/form-data'
})
axios.interceptors.request.use(
    config => {
        // let menuName = router.history.current.meta.menuName || window.menuName
        // if (menuName) {
        //     console.log(menuName)
        //     config.headers['menu_name'] = Base64.encode(menuName)
        // }
        // if (!config.headers.hasOwnProperty('xxl_sso_sessionid')) {
        //     config.headers['xxl_sso_sessionid'] = localStorage.getItem('xxl_sso_sessionid')
        // }
        return config
    }
)
// http响应拦截器
axios.interceptors.response.use(
    response => {
        console.log(response, "response")
        if (response.data) {
            if (response.data.code === '100001') { //未登录状态
                // exitLogin()
                router.push('/login')
            }
            if (response.data.code === '100002 ') {

            }
        }
        return response
    },
    error => {
        errorStatusHandler(error)
        return error
    }
)

function checkStatus(response) {

    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response.data
    }
    let msg = '网络异常'
    if (response.response) {
        if (response.response.status === 404) {
            msg = response.response.config.url + '路径404'
        } else {
            msg = response.response.data.message
        }
    } else if (response.msg) {
        msg = response.msg
    }
    return {
        code: '-1',
        message: msg
    }
}

function checkCode(res) {
    if (res.code === '0') {
        if (res.hasOwnProperty('data')) {
            return res.data
        } else {
            return res
        }
    }
    return res
}

function errorStatusHandler(error) {
    if (error && error.status) {
        switch (error.response.status) {
            case 400:
                error.msg = '错误请求'
                break
            case 401:
                error.msg = '未授权，请重新登录'
                break
            case 403:
                error.msg = '拒绝访问'
                break
            case 404:
                error.msg = '请求错误，未找到该资源'
                break
            case 405:
                error.msg = '请求方法未允许'
                break
            case 408:
                error.msg = '请求超时'
                break
            case 500:
                error.msg = '服务器端出错'
                break
            case 501:
                error.msg = '网络未实现'
                break
            case 502:
                error.msg = '网络错误'
                break
            case 503:
                error.msg = '服务不可用'
                break
            case 504:
                error.msg = '网络超时'
                break
            case 505:
                error.msg = 'http版本不支持该请求'
                break
            default:
                error.msg = `连接错误${error.response.status}`
        }
    } else {
        if (error.response) {
            if (error.response.status === 404) {
                error.msg = error.response.config.url + '路径404'
            }
        } else {
            error.msg = '连接到服务器失败'
        }
    }
    return error
}

export default {
    get(url, params, timeout = 300000) {
        return axios({
            method: 'get',
            url,
            params,
            timeout,
            headers: header
        })
            .then(response => {
                return checkStatus(response)
            })
            .then(res => {
                return checkCode(res)
            })
    },
    post(url, options, timeout = 300000) {
        return axios({
            method: 'post',
            url,
            data: options,
            timeout,
            headers: postHeader
        })
            .then(response => {
                return checkStatus(response)
            })
            .then(res => {
                return checkCode(res)
            })
    },
    delete(url, params) {
        return axios({
            method: 'delete',
            url,
            params,
            headers: header
        })
            .then(response => {
                return checkStatus(response)
            })
            .then(res => {
                return checkCode(res)
            })
    },
    put(url, options) {
        return axios({
            method: 'put',
            url,
            data: options,
            headers: postHeader
        })
            .then(response => {
                return checkStatus(response)
            })
            .then(res => {
                return checkCode(res)
            })
    },
    patch(url, options) {
        return axios({
            method: 'patch',
            url,
            data: options,
            headers: postHeader
        })
            .then(response => {
                return checkStatus(response)
            })
            .then(res => {
                return checkCode(res)
            })
    },
    formDataPost(url, options, timeout = 300000) {
        return axios({
            method: 'post',
            url,
            data: options,
            timeout,
            headers: formDataHeader
        })
            .then(response => {
                return checkStatus(response)
            })
            .then(res => {
                return checkCode(res)
            })
    }
}