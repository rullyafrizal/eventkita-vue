import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const auth = JSON.parse(localStorage.getItem('blogApplication')).auth.token
    if (!(Object.keys(auth).length === 0)) {
      next()
    } else {
      alert('Access Restricted')
      next({ path: '/' })
    }
  }
  next()
})

export default router
