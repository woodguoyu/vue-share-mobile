import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    cateInfo: []
  },
  mutations: {
    "SET_MSG": function(state, cateInfo) {
      state.cateInfo = cateInfo
      console.log('保存', state.cateInfo)
    }
  },
  getters: {
    "GET_MSG": function(state) {
      console.log('获取', state.cateInfo)
      return state.cateInfo
    }
  },
  actions: {
    "SET_MSG": function(state, cateInfo) {
      console.log('获取', state.cateInfo)
      store.commit("SET_MSG", cateInfo)
    }
  }
})
export default store
