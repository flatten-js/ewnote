import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import page from './modules/page'

export default new Vuex.Store({
  modules: {
    page
  }
})
