import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const {resolve} = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  base: './dist',
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

  }
})
