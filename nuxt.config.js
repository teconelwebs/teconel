export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  server: {
    host: process.env.HOST || '172.26.128.1',
    port: process.env.PORT || 3002
  },
  router: {
    middleware: 'auth'
  },


 

  
  ssr: false,

  baseURL: 'http://localhost/myapp/api', // Adjust accordingly
  credentials: true,
  
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost/myapp/api/crux',


  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Welfog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' } ,
      // { rel: 'preload', href: '@/assets/vendor/fontawesome-free/webfonts/fa-regular-400.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
   
     
    ],
   script: [
      // External JS
    
      
    ]



  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@/assets/css/app.min.css',
    '@/assets/css/style.min.css',
    '@fortawesome/fontawesome-free/css/all.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/custom.js', mode: 'client' },
    { src: '~/plugins/auth.js', mode: 'client' },
    { src: '~/plugins/router-patch.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
  ],




  dotenv: {
    filename: '.env' // Name of your .env file
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
     publicPath: '/_nuxt/'
  },

  axios: {
    // Axios module configuration
    baseURL: 'http://localhost', // Adjust baseURL if needed
  },

//   router: {
//     // middleware: 'auth',
//  },

  common: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
}
