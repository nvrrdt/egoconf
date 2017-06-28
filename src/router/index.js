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
      component: EgoHome,
      beforeEnter: ifAuth
    },
    {
      path: '/base/messages',
      name: 'BaseMessages',
      component: BaseMessages,
      beforeEnter: requireAuth
    },
    {
      path: '/base/profile',
      name: 'BaseProfile',
      component: BaseProfile,
      beforeEnter: requireAuth
    },
    {
      path: '/base/explore',
      name: 'BaseExplore',
      component: BaseExplore,
      beforeEnter: requireAuth
    },
    {
      path: '/base/history',
      name: 'BaseHistory',
      component: BaseHistory,
      beforeEnter: requireAuth
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
      redirect: '/',
      beforeEnter: ifAuth
    }
  ]
})

export default router

function requireAuth (to, from, next) {
  var user = firebase.auth().currentUser

  if (!user) {
    console.log('User is not logged in')
    next({
      path: '/account/login',
      query: { redirect: to.fullPath }
    })
  } else {
    console.log('User is logged in:' /*, user.uid */)
    next()
  }
}

function ifAuth (to, from, next) {
  var user = firebase.auth().currentUser

  if (user) {
    next({
      path: '/base/messages',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}
