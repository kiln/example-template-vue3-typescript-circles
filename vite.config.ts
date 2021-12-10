import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],

  build: {
    target: 'es6',

    lib: {
      entry: 'src/main.ts',
      formats: ['iife'],
      name: 'Template',
      fileName: () => 'template.js',
    },

    outDir: '.',
  }
})
