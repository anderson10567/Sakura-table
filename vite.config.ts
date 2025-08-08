
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  
  base: '/Sakura-table/', 

  plugins: [react()],
    build: {
    rollupOptions: {
      input: '/public/index.html',  
    },
  },
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   // @ts-ignore
  test: {
    environment: "jsdom", 
    globals: true,        
    setupFiles: "./src/test/setup.ts", 
  },
})
