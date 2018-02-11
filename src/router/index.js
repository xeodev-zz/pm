import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store/index'
import Signup from '../components/User/Signup'
import Signin from '../components/User/Signin'
import Profile from '../components/User/Profile'
import MyProjects from '../components/Projects/MyProjects'
import Projects from '../components/Projects/Projects'
import Project from '../components/Projects/Project'
import Task from '../components/Projects/Tasks/Task'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'Projects' },
      meta: {
        requiresAuth: true
      }
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
      path: '/proyectos/:id',
      name: 'Project',
      component: Project,
      children: [
        {
          path: 'tarea/:task_key',
          name: 'Task',
          component: Task
        }
      ],
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
  let isAuth = store.state.user != null
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (!(from.name === 'Task' && to.name === 'Task') && !(from.name === 'Task' && to.name === 'Project') && !(from.name === 'Project' && to.name === 'Task')) {
    store.dispatch('unbindFirebaseRef')
  }
  if (requiresAuth && !isAuth) next('/login')
  else if (!requiresAuth && isAuth) next('/')
  else next()
})

export default router
