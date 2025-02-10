import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(() => {
  const rootDir = path.resolve()
  const paths = {
    version: path.join(rootDir, 'public', 'version.json'),
    dist: path.join(rootDir, 'dist', 'version.json'),
    deploy: path.join(rootDir, 'version.json'),
  }

  return {
    plugins: [vue(), vueDevTools()],

    async closeBundle() {
      try {
        fs.copyFileSync(paths.version, paths.dist)
        fs.copyFileSync(paths.dist, paths.deploy)
        console.log('version.json successfully updated')
      } catch (error) {
        console.error('Error while copying version.json:', error)
      }
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      port: 3000,
      strictPort: true,
      hmr: { protocol: 'ws', host: 'localhost', port: 3000 },
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
  }
})
