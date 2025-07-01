import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        character: 'character-selection.html',
        inventory: 'inventory.html',
        map: 'map.html',
        mission: 'mission.html',
        monster: 'monster.html',
        skillweb: 'skillweb.html',
        test: 'test.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})