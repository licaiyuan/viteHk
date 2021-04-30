//引入vue

//引入vue-router

import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from './components/layOut.vue'

import sideBar from './components/sideBar.vue'
// Vue.use(Router)


//定义routes路由的集合，数组类型

export const routes = [
    { path: "/", redirect: '/login' },
    {
        path: "/login",
        name: "login",
        component: () => import("./views/login.vue")
    },
    // {
    //     path: "/configurationItem",
    //     name: "configurationItem",
    //     component: () => import("@/views/configuration/configurationItem.vue")
    // },
    // {
    //     path: "/hkapp",
    //     name: "hkapp",
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'user', name: 'user', component: sideBar,

    //             children: [{ path: 'list', name: 'list', component: () => import("@/components/HelloWorld.vue"), }]
    //         },
    //     ],

    // }
]
export let routes2 = [{
    path: "/hkapp",
    name: "hkapp",
    component: 'Layout',
    children: [
        {
            path: 'user', name: 'user', component: 'sideBar',

            children: [{ path: 'list', name: 'list', component: 'HelloWorld', }]
        },
    ],

}]
const router = createRouter({
    history: createWebHashHistory(),
    routes
});




export default router;


