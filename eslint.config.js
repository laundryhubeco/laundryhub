import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    '.output',
    '.tanstack',
    'node_modules',
    'public',
    'routeTree.gen.*',
  ]),
  {
    files: [
      '**/*.{js,jsx}',
      'db/**/*.js',
      'lib/**/*.js',
      'scripts/**/*.{js,mjs}',
      'drizzle.config.js',
    ],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // File route TanStack Start mengekspor `Route` (bukan komponen) selain
    // komponennya — pola wajar yang membuat aturan fast-refresh protes.
    files: ['src/routes/**/*.{js,jsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
