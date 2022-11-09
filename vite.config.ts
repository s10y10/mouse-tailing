import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    reportCompressedSize: false,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'MouseTail',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
