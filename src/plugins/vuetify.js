import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/es5/util/colors'
import '@/assets/styles/variables.scss'

import id from '@/locale/id'
import en from '@/locale/en'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { id, en },
    current: 'en'
  },
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
        },
        light: {
          primary: colors.green.base,
          secondary: colors.blue.base,
          accent: colors.blueGrey.base,
          error: colors.red.base,
          warning: colors.cyan.base,
          info: colors.orange.base,
          success: colors.lightGreen.base
        }
      }
    }
})
