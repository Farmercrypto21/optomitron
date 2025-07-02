import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  base: '/',  // ← Critical for Netlify
  build: {
    outDir: 'dist',
    emptyOutDir: true,  // ← Cleans previous builds
    rollupOptions: {
      input: {
        main: './index.html',  // ← Add ./ prefix to all paths
        character: './character-selection.html',
        inventory: './inventory.html',
        map: './map.html',
        mission: './mission.html',
        monster: './monster.html',
        skillweb: './skillweb.html',
        test: './test.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
