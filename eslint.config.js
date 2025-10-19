//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
      '.cache',
      'public',
      '*.config.js',
      '*.config.ts',
      'routeTree.gen.ts',
      'vite-env.d.ts',
      'src/components/ui/**.tsx',
    ],
  },
  ...tanstackConfig,
]
