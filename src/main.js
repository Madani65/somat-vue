import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2'
import VueSplide from '@splidejs/vue-splide'
import VueToastr from 'vue-toastr'
import VueApexCharts from 'vue-apexcharts'
import VueFilterDateFormat from 'vue-filter-date-format'
import simplebar from "simplebar-vue"
import UUID from "vue-uuid"
// import VueEasytable from "vue-easytable" // import library

import router from './router'
import store from './store'

import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import 'simplebar/dist/simplebar.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'
// import "vue-easytable/libs/theme-default/index.css" // import style

Vue.config.productionTip = false

Vue.use(VueSweetalert2)
Vue.use(VueSplide)
Vue.use(VueFilterDateFormat)
Vue.use(VueToastr, {
  defaultTimeout: 3000,
  defaultProgressBar: true,
  defaultCloseOnHover: true,
  defaultPosition: 'toast-top-right',
  defaultStyle : {
    'font-size' : '12px',
    'font-family' : 'Roboto',
    'width' : 'auto',
    'max-width' : '400px',
    'opacity' : '0.9'
  }
})
Vue.use(VueApexCharts)
Vue.component('simplebar', simplebar)
Vue.use(UUID)
// Vue.use(VueEasytable)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
