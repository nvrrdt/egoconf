// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './firebase'
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import AuthPlugin from '@/auth'
import * as firebase from 'firebase'
import VueAnalytics from 'vue-analytics'
import VueStripeCheckout from 'vue-stripe-checkout'

Vue.component('icon', Icon)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueFire)
Vue.use(AuthPlugin)

Vue.use(VueAnalytics, {
  id: 'UA-108328645-1',
  router
})

// base/global options for stripe
const options = {
  // key: 'pk_test_HQIqQLPXFJtPpkZWVIAu9MeV',
  key: 'pk_live_D5sTvvW0AcAnX6uC6OroAfJj',
  // image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  currency: 'EUR',
  // billingAddress: true,
  panelLabel: 'Donate {{amount}}'
}

Vue.use(VueStripeCheckout, options)

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
      App
    }
  })

  // stop listening
  unsubscribe()
})
