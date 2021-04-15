import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from './modules/auth'
import page from './modules/page'

export default new Vuex.Store({
  modules: {
    auth,
    page
  }
})
