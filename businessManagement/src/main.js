import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router.js'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import store from '@/store/index'
import '@/lib/permission'
const app = createApp(App);
app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
// Vue.config.productionTip = false

// new Vue({
//     el: '#app',
//     router,
//     store,
//     render: h => h(App)
// })

