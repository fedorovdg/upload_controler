import Vue from 'vue';
import Vuex from 'vuex';
import articles from "./modules/objects";
Vue.use(Vuex);

export default () => new Vuex.Store({
  modules: {
    articles
  }
})
