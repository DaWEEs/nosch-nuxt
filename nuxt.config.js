import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - nuxt',
    title: 'Střední odborná škola NET OFFICE',
    htmlAttrs:{
      lang:'cs',
      amp: true
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Webové stránky Střední odborné školy NET OFFICE Orlová spol. s.r.o' },
      { name:"msapplication-TileColor", content:"#2b5797"},
      { name:"theme-color", content:"#ffffff"},
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes:"180x180", href: '/favicon.ico' },      
      { rel: 'icon', type: 'image/png', sizes:"32x32", href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes:"16x16", href: '/favicon-16x16.png' },  
      { rel: 'apple-touch-icon', sizes:"180x180", href: '/apple-touch-icon.png'},
      { rel: 'mask-icon', href:"/safari-pinned-tab.svg", color:'#5bbad5'},
      { rel:'manifest', href: '/site.webmanifest'},    
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/4.4.95/css/materialdesignicons.min.css' }
    ],
    script:[
      { type: 'text/javascript', src: '/main.js', defer: 'defer'}
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~assets/scss/colors.scss'
  ],

  styleResources: {
    scss: ['./assets/scss/*.scss']
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/firebase',
    { src: '~/plugins/TiptapVuetify', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/style-resources'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://localhost:3000/api'
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['vuetify/lib', "tiptap-vuetify"],
    extend(config, ctx) {
      // Include the compiler version of Vue so that wp-content works
      config.resolve.alias["vue$"] = "vue/dist/vue.esm.js"
  }
  },

  analytics: {
    collectionEnabled: true // default
  },

  services:{
    firestore: true,
    auth:true,
    analytics: true,
    storage: true,
  },

  auth: {
    persistence: 'local', // default
    initialize: {
      onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
      onAuthStateChangedAction: 'onAuthStateChangedAction',
      subscribeManually: false
    },
    ssr: false, // default
    emulatorPort: 9099,
    emulatorHost: 'http://localhost',
  },

  firestore: {
    memoryOnly: false, // default
    chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
    enablePersistence: true,
    emulatorPort: 8080,
    emulatorHost: 'localhost',
  },

  googleAnalytics: {
    id: 'G-BRBD2PEP7S'
  }
}
