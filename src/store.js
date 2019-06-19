import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snack: { type: 'default', msg: '', show: false },
    loading: false
  },
  mutations: {
    setSnack (state, value) {
      state.snack = value
    },
    setLoading (state, value) {
      state.loading = value
    }
  },
  actions: {
    snackSuccess ({ commit }, msg = 'Operação realizada com sucesso!') {
      commit('setSnack', { type: 'success', msg, show: true })
    },
    snackWarning ({ commit }, msg) {
      commit('setSnack', { type: 'warning', msg, show: true })
    },
    snackInfo ({ commit }, msg) {
      commit('setSnack', { type: 'info', msg, show: true })
    },
    snackError ({ commit }, msg) {
      commit('setSnack', { type: 'error', msg, show: true })
    },
    clearSnack ({ commit }) {
      commit('setSnack', { type: 'default', msg: '', show: false })
    }
  },
  getters: {
    snack: state => state.snack,
    loading: ({ loading }) => loading
  }
})
