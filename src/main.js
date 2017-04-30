// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './firebase'

import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
Vue.component('icon', Icon)

import AuthPlugin from '@/auth'
import * as firebase from 'firebase'

import 'vue-instant/dist/vue-instant.css'
import VueInstant from 'vue-instant/dist/vue-instant.common'
Vue.use(VueInstant)

Vue.config.productionTip = false

Vue.use(VueFire)
Vue.use(AuthPlugin)

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
      App,
      'vue-instant': VueInstant.VueInstant
    }
  })

  // stop listening
  unsubscribe()
})
