import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import VueRouter from 'vue-router'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(VueRouter)

var requestURL = "https://maureenduffcasting-c8651.firebaseio.com/.json"
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

Vue.prototype.getData = function(cb) {
  if (localStorage.getItem("d")) {
    cb(JSON.parse(localStorage.getItem("d")))
  }
  request.onload = function() {
    localStorage.setItem("d", JSON.stringify(request.response));
    cb(request.response)
  }
  
}


new Vue({
  render: h => h(App),
  vuetify,
}).$mount('#app')

