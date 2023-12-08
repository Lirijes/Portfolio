export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  modules: [
    'vue3-carousel-nuxt',
    // '@nuxtjs/auth-next',
  ],

  // auth: {
  //   strategies: {
  //     local: {
  //       token: {
  //         property: 'authToken',
  //       },
  //     },
  //   },
  // },
  
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  
  generate: {
    routes: ['/'],
  },

  // router: {
  //   middleware: ['auth'],
  // },
});