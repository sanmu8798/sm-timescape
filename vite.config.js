import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 判断当前是否为生产环境（打包构建）
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [vue()],
  base: isProduction ? '/sm-timescape/' : '/',  // ← 关键修改
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})