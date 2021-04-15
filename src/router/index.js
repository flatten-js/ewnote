import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from '@/store'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/page',
    component: () => import('@/views/Page.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/page/test',
    component: () => import('@/views/Test.vue'),
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      if (store.getters['page/limit']) next('/page')
      else next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (!to.matched.some(record => record.meta.requiresAuth)) return next()

  try {
    await store.dispatch('auth/verify')
    next()
  } catch (err) {
    next('/login')
  }
})

export default router
