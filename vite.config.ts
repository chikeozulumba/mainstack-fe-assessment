import { resolve } from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

import netlify from '@netlify/vite-plugin-tanstack-start'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    netlify(),
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    svgrPlugin({
      // svgr options: https://react-svgr.com/docs/options/
      // svgrOptions: {
      //   exportType: 'default',
      //   ref: true,
      //   svgo: false,
      //   titleProp: true,
      // },
      // include: '**/*.svg',
    }),
    tailwindcss(),
  ],
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
