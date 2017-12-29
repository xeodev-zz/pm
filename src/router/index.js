import Vue from 'vue'
import Router from 'vue-router'
import * as firebase from 'firebase'
import HelloWorld from '@/components/HelloWorld'
import Signup from '../components/User/Signup'
import Signin from '../components/User/Signin'
import Profile from '../components/User/Profile'
import MyProjects from '../components/User/MyProjects'
import Projects from '../components/Projects/Projects'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/registrar',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/proyectos',
      name: 'Projects',
      component: Projects,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/perfil',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/mis-proyectos',
      name: 'MyProjects',
      component: MyProjects,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('/signin')
  else if (!requiresAuth && currentUser) next('/')
  else next()
})

export default router
