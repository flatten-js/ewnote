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
    _request(context, { url, params = {} }) {
      return axios.get(url, {
        headers: {
          Authorization: `Bearer ${utils.cookie.get('token')}`
        },
        params
      })
    },
    request({ dispatch }, { url, params, cb }) {
      dispatch('_request', { url, params })
      .then(cb)
      .catch(err => {
        if (err.response.status == 401) {
          alert('Authentication failed.')
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
