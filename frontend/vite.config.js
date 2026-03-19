import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: /\.(js|jsx|ts|tsx)$/,
    }),
    tailwindcss(),
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
  },
  server: {
    port: 3000,
  },
});
