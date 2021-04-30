// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
const { resolve } = require('path')
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "components": path.resolve(__dirname, "src/components"),
            "styles": path.resolve(__dirname, "src/styles"),
            "plugins": path.resolve(__dirname, "src/plugins"),
            "views": path.resolve(__dirname, "src/views"),
            "layouts": path.resolve(__dirname, "src/layouts"),
            "utils": path.resolve(__dirname, "src/utils"),
            "apis": path.resolve(__dirname, "src/apis"),
            "dirs": path.resolve(__dirname, "src/directives"),
        },
    },


    hostname: '0.0.0.0',
    port: 8080,
    // 是否自动在浏览器打开
    open: true,
    // 是否开启 https
    https: false,
    // 服务端渲染
    ssr: false,
    /**
     * 在生产中服务时的基本公共路径。
     * @default '/'
     */
    base: './',
    /**
     * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
     * @default 'dist'
     */
    outDir: 'dist',
    // 反向代理
    proxy: {
        '/api': {
            target: 'http://172.16.20.20:38000',
            changeOrigin: true,
            logLevel: 'debug',
            rewrite: path => path.replace(/^\/api/, '')
        }
    }

})
