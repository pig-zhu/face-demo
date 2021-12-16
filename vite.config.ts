import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const {resolve} = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
	resolve: {
    alias: {
   		  '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@public': resolve(__dirname, 'public'),
        find: /\/@ts\//,
        replacement: resolve('src') + '/',
    }
  },
  build: {
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
