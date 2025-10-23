import 'dotenv/config'

import { resolve } from 'node:path'

import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

import netlify from '@netlify/vite-plugin-tanstack-start'
import svgrPlugin from 'vite-plugin-svgr'

const isCloudflare = process.env.VITE_DEPLOY_ENV === 'cloudflare'

const plugins = [
  TanStackRouterVite({ autoCodeSplitting: true }),
  viteReact(),
  svgrPlugin(),
  tailwindcss(),
]

if (isCloudflare) {
  plugins.push(cloudflare({ viteEnvironment: { name: 'ssr' } }))
} else {
  plugins.push(netlify())
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
