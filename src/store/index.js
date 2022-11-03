import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth"
import toast from "./modules/toast"
import product from "./modules/products"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    toast,
    product
  }
})
