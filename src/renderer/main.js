import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import store from './store'
import '../../node_modules/vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  store,
  template: '<App/>'
}).$mount('#app')
