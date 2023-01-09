import { createStore } from 'vuex'

export default createStore({
  state: {
    visible: false,
    text: '',
    type: 'success'
  },
  mutations: {
    toast(state, payload) {
      state.visible = true;
      state.text = payload.text;
      state.type = payload.type;
    },

  },
  actions: {
    showToast( {commit}, payload) {
      commit('toast', payload)
      setTimeout(() => {
        this.state.visible = false;
      }, 3000)
    }
  },
  modules: {
  }
})