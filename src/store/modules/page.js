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
    write(state, payload) {
      state.data.push(payload)
    },
    update(state, payload) {
      state.data = state.data.map(line => {
        const answer = payload.answers.find(answer => answer.word == line.word)
        return { ...line, miss: answer.check }
      })
    },
    reset(state) {
      state.data = []
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
