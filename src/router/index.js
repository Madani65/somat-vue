import Vue from 'vue'
import VueRouter from 'vue-router'
import { publicRoute, protectedRoute } from './config'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes = publicRoute.concat(protectedRoute)
import store from '@/store'

Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    position.x = 0
    position.y = 0
    return position
  }
}

const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'active',
  routes: routes,
  scrollBehavior
})
// router gards
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.getters['auth/getAccessToken']
  if (to.name === 'login' || to.name === 'forget') {
    next()
  } else {
    if (token) {
      next()
    } else {
      next({ name: 'login'})
    }
  }

  //auth route is authenticated
})

router.afterEach(() => {
  NProgress.done()
})

export default router
