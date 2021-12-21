import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const {resolve} = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  base: '/face/',
  plugins: [vue()],
	resolve: {
    alias: {
   		  '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        'images': 'public/images',
        'models': 'public/models',
        'media': 'public/media',
        find: /\/@ts\//,
        replacement: resolve('src') + '/',
    }
  },
  build: {

  }
})
