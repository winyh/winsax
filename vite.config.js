import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    assetsDir: 'winsax/assets', // 静态资源存放文件夹名
  },
  plugins: [react()],
})
