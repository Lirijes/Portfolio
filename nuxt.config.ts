export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiKey: process.env.API_KEY,
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },

  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  modules: [
    'vue3-carousel-nuxt',
  ],
  
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  
  generate: {
    routes: ['/'],
  },
});