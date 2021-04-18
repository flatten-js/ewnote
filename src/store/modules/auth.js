import axios from 'axios'
import router from '@/router'
import utils from '@/utils'

export default {
  namespaced: true,

  state: {
    user: {
      id: 0,
      name: '',
      picture: ''
    }
  },

  mutations: {
    update(state, paylaod) {
      state.user = { ...state.user, ...paylaod }
    }
  },

  actions: {
    logout() {
      utils.cookie.delete('token')
      router.push('/login')
    },
    _request(context, { method = 'get', url, params }) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${utils.cookie.get('token')}`
      }

      switch (method) {
        case 'get':
          return axios.get(url, { headers, params })

        case 'post':
          return axios.post(url, params, { headers })

        default:
          return Promise.reject('Invalid method')
      }
    },
    request({ dispatch }, { cb, ...options }) {
      dispatch('_request', options)
      .then(cb)
      .catch(err => {
        if (err.response.status == 401) {
          alert('Authentication failed')
          return router.push('/login')
        }
      })
    },
    verify({ dispatch }) {
      return dispatch('_request', { url: '/api/auth/verify' })
    }
  },

  getters: {
    user: state => state.user
  }
}
