import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import routes from './route.config.js'
import './mint-ui.js'
import store from './store'
import Loading from './components/loading'
import utils from './utils/fun'
import filters from './filters'

Vue.use(VueRouter);
Vue.use(Loading);
Vue.use(utils);

Object.keys(filters).forEach(key => Vue.filter(key,filters[key]))


const router = new VueRouter({
  // mode: 'history',
  scrollBehavior: ()=> {
    return { x: 0, y: 0 }
  },
	routes
})

axios.defaults.baseURL = 'http://rc.mgkit.cn/public/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(function (config) {
  store.dispatch('showLoading')
  return config;
}, function (error) {
  return Promise.reject(error);
});


axios.interceptors.response.use(function (response) {
  store.dispatch('hideLoading')
  return response;
}, function (error) {
  return Promise.reject(error);
});

Vue.prototype.$http = axios;


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
})
