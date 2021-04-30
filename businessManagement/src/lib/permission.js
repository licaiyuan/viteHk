import router from '@/router'
import store from '@/store/index.js'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
import { getAsyncRoutes } from './asyncRouter'
import { routes2 } from '@/router.js';
const whiteList = ['/login'];
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    document.title = to.meta.title;
    // 获取用户token，用来判断当前用户是否登录
    // const hasToken = getToken()
    const hasToken = 'ppp'
    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            //异步获取store中的路由
            // let route = await store.state.addRoutes;
            let route = routes2;
            const hasRouters = route && route.length > 0;
            //判断store中是否有路由，若有，进行下一步
            if (hasRouters) {
                next()
            } else {
                //store中没有路由，则需要获取获取异步路由，并进行格式化处理
                try {
                    const accessRoutes = getAsyncRoutes(routes2);
                    // 动态添加格式化过的路由
                    router.addRoutes(accessRoutes);
                    next({ ...to, replace: true })
                } catch (error) {
                    // Message.error('出错了')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})