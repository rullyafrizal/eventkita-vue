import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    alias: '*',
    name: 'notFound',
    component: () => import('../Views/NotFound')
  },
  {
    path: '/restricted',
    name: 'Restricted',
    component: () => import('../Views/Restricted')
  },
  {
    path: '/',
    name: 'Landing',
    component: () => import('../Views/Landing')
  },
  {
    path: '/events/:id',
    name: 'Event',
    component: () => import('../Views/Event')
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('../Views/Events')
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('../Views/Articles')
  },
  {
    path: '/articles/:id',
    name: 'Article',
    component: () => import('../Views/Article')
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('../Views/Login')
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('../Views/Register')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../Views/Dashboard'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/profile',
    name: 'Profile',
    component: () => import('../Views/Profile'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0, behavior: 'smooth' })
      }, 350)
    })
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const auth = JSON.parse(localStorage.getItem('eventkita-token')).auth.token

    if (!(Object.keys(auth).length === 0)) {
      next()
    } else {
      next({ path: '/auth/login' })
    }
  }
  next()
})

export default router
