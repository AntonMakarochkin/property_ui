import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
		modules: {
			generateScopedName: '[folder]_[local]__[hash:base64:5]',
		},
	},
})
