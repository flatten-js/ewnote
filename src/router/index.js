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
    path: '/',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/bookshelf',
    component: () => import('@/views/Bookshelf.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/bookshelf/:name',
    component: () => import('@/views/Note.vue'),
    meta: { requiresAuth: true }
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
  } catch (err) {
    return next('/login')
  }

  if (!store.getters['auth/user'].id) {
    await store.dispatch('auth/request', {
      url: '/api/users/profile',
      cb: ({ data }) => {
        store.commit('auth/update', data)
      }
    })
  }

  next()
})

export default router
