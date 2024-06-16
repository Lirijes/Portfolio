export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiKey: process.env.API_KEY,
      apiBaseUrl: process.env.API_BASE_URL,
      localServerUrl: process.env.LOCAL_SERVER_URL || 'http://localhost:3000',
    },
  },

  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    '@fortawesome/fontawesome-svg-core/styles.css'
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