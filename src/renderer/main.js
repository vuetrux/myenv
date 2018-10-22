import Vue from 'vue'
import App from './App.vue'
import '../../node_modules/bulma/css/bulma.css'
import '../../static/themify-icons.css'
// import '../../static/animate.min.css'

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'));
  Vue.use({
      install: function (Vue) {
          Vue.prototype.$native = require('electron').remote
      }
  })
}
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app');
