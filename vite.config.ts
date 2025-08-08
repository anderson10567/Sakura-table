
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   // @ts-ignore
  test: {
    environment: "jsdom", // браузерный контекст для React Testing Library
    globals: true,        // чтобы писать тесты без импорта expect и др.
    setupFiles: "./src/test/setup.ts", // путь к файлу с настройками
  },
})
