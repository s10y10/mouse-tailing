import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    reportCompressedSize: false,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'MouseTailing',
    },
  },
  resolve: {
    alias: {
      '@': resolve('./lib'),
    },
  },
  plugins: [dts({ insertTypesEntry: true, exclude: 'example' })],
});
