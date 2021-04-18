import utils from '@/utils'

export default {
  namespaced: true,

  state: {
    data: [],
    _limit: {
      min: 5,
      // max: 50
    }
  },

  mutations: {
    restore(state) {
      const data = localStorage.getItem('page/data')
      state.data = JSON.parse(data)
    },
    write(state, payload) {
      const idx = state.data.findIndex(line => line.word == payload.word)

      if (idx < 0) state.data.push(payload)
      else state.data.splice(idx, 1, payload)

      localStorage.setItem('page/data', JSON.stringify(state.data))
    },
    update(state, payload) {
      state.data = state.data.map(line => {
        const answer = payload.answers.find(answer => answer.word == line.word)
        return { ...line, miss: answer.check }
      })
      localStorage.setItem('page/data', JSON.stringify(state.data))
    },
    reset(state) {
      state.data = []
      localStorage.removeItem('page/data')
    }
  },

  actions: {
  },

  getters: {
    get: state => {
      const { data } = state
      return { data, line: data.length }
    },
    limit: (state, getters) => {
      const { min } = state._limit
      return utils.remaining(0, min, getters.get.line)
    },
    complete: (state) => {
      return state.data.length && state.data.every(line => !line.miss)
    }
  }
}
