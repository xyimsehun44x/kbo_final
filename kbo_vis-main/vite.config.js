import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/kbo_vis/',  // 꼭 슬래시 포함
  plugins: [react()]
})