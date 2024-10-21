export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '',
    htmlAttrs: {
      lang: 'Berc'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo-nobackground.png' },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap'
      },
      {
        src: 'https://cdn.socket.io/4.0.0/socket.io.min.js',
        type: 'text/javascript'
      }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/socket.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],
  styleResources: {
    scss: [
      '~/assets/scss/variables.scss',
      '~/assets/scss/mixins.scss',
      '~/assets/scss/classes.scss',
      '~/assets/scss/animations.scss',
      '~/assets/scss/main.scss',
      '~/assets/scss/success.scss',
      '~/assets/scss/header.scss',
      '~/assets/scss/popup.scss',
      '~/assets/scss/warning.scss',
      '~/assets/scss/section.scss',
      '~/assets/scss/container.scss',
      '~/assets/scss/jumbotron.scss',
      '~/assets/scss/announcement.scss',
      '~/assets/scss/landing.scss',
      '~/assets/scss/landingoffers.scss',
      '~/assets/scss/curvedoffer.scss',
      '~/assets/scss/footer.scss',
      '~/assets/scss/overview.scss',
      '~/assets/scss/fonts.scss',
      '~/assets/scss/userheader.scss',
      '~/assets/scss/profile.scss',
      '~/assets/scss/auth.scss',
      '~/assets/scss/apply.scss',
      '~/assets/scss/dashboard.scss',
      '~/assets/scss/cardlist.scss',
      '~/assets/scss/displaycard.scss',
      '~/assets/scss/investmentcard.scss',
      '~/assets/scss/documentdisplay.scss',
      '~/assets/scss/interactransfer.scss',
      '~/assets/scss/addmoney.scss',
    ],
    hoistUseStatements: true
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    target: 'static'
  }
}
