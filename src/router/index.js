import Vue from 'vue'
import Router from 'vue-router'
import EgoHome from '@/components/EgoHome'
import BaseMessages from '@/components/base/Messages'
import BaseProfile from '@/components/base/Profile'
import BaseExplore from '@/components/base/Explore'
import BaseHistory from '@/components/base/History'
import AccountLogin from '@/components/account/Login'
import AccountSignup from '@/components/account/Signup'

import * as firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'EgoHome',
      component: EgoHome
    },
    {
      path: '/base/messages',
      name: 'BaseMessages',
      component: BaseMessages,
      beforeEnter: loginRequired
    },
    {
      path: '/base/profile',
      name: 'BaseProfile',
      component: BaseProfile,
      beforeEnter: loginRequired
    },
    {
      path: '/base/explore',
      name: 'BaseExplore',
      component: BaseExplore,
      beforeEnter: loginRequired
    },
    {
      path: '/base/history',
      name: 'BaseHistory',
      component: BaseHistory,
      beforeEnter: loginRequired
    },
    {
      path: '/account/login',
      name: 'AccountLogin',
      component: AccountLogin
    },
    {
      path: '/account/signup',
      name: 'AccountSignup',
      component: AccountSignup
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router

function loginRequired (to, from, next) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      next()
    } else {
      next({ path: '/account/login' })
    }
  })
}
