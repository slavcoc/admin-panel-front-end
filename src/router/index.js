import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import AdminHome from '@/pages/AdminHome'
// import Home from '@/pages/Home'
import helpers from '@/helpers'

Vue.use(Router)

function requireAuth (to, from, next) {
  const Cookie = helpers.getCookie('access_token')
  if (Cookie === '' || !Cookie) {
    next('/login')
  }
  next()
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: AdminHome,
      beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'HelloWorld',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminHome,
      beforeEnter: requireAuth
    }
  ]
})
