import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import './registerServiceWorker'

const router = new VueRouter({ 
  mode: 'history', 
  routes: [{path:"/"}] 
})

Vue.config.productionTip = false
Vue.use(VueRouter)

Vue.prototype.getData = function(cb) {
  const requestURL = "https://maureenduffcasting-c8651.firebaseio.com/.json"
  let request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.onload = function() {
    localStorage.setItem("d", JSON.stringify(request.response));
    cb(request.response)
  }
  request.send();
  if (localStorage.getItem("d")) {
    cb(JSON.parse(localStorage.getItem("d")))
  }
}


new Vue({
  render: h => h(App),
  vuetify,
  router,
}).$mount('#app')

