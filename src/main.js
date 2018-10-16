import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import store from './store'
import moment from 'moment'

moment.locale('sr');
Vue.use(Vuetify)

Vue.filter('date', value => {
  return value ? moment(value).format('dddd, D.M. u HH:mm') : ''
})
Vue.filter('removeHTML', value => !value ? '' : strip(value))
Vue.filter('limit', (str, maxLength) => str.length > maxLength ? str.slice(0, maxLength) + '...' : str)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')

function strip(html){
   var doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || "";
}