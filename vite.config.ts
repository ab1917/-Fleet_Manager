import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true, // Permite acesso externo
    port: 5173, // Porta padrão
    strictPort: true, // Garante que use sempre esta porta
    watch: {
      usePolling: true, // Melhor compatibilidade em alguns ambientes
    }
  },
});