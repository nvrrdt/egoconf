import Vue from 'vue'
import Router from 'vue-router'
import BaseHome from '@/components/base/Home'
import BaseMessages from '@/components/base/Messages'
import BaseProfile from '@/components/base/Profile'
import BaseExplore from '@/components/base/Explore'
import BaseHistory from '@/components/base/History'
import AccountLogin from '@/components/account/Login'
import AccountSignup from '@/components/account/Signup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/base'
    },
    {
      path: '/base',
      name: 'BaseHome',
      component: BaseHome
    },
    {
      path: '/base/messages',
      name: 'BaseMessages',
      component: BaseMessages
    },
    {
      path: '/base/profile',
      name: 'BaseProfile',
      component: BaseProfile
    },
    {
      path: '/base/explore',
      name: 'BaseExplore',
      component: BaseExplore
    },
    {
      path: '/base/history',
      name: 'BaseHistory',
      component: BaseHistory
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
    }
  ]
})
