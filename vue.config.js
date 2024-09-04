const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'My PWA App',
    themeColor: '#42b983',
    msTileColor: '#000000',
    manifestOptions: {
      background_color: '#ffffff',
      start_url: '.',
      display: 'standalone',
      icons: [
        {
          src: 'img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
})
