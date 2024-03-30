import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../App.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/Register.vue')
    },
    {
      // path: '/about',
      // name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    }
  ]
})

// ============> Check if user is already logged in or has a valid token
const checkAuthentication = () => {
  return true
}

// ===========> Route guards
const routeBeforeEnter = (to, from, next) => {
  // 1) Check if the user has a valid token or not
  const isUserAuthenticated = checkAuthentication()

  // If user is logged in and has a valid token then proceed user to go where he/she wants
  // If user wants to register then its okay to let them go there
  if (isUserAuthenticated || to.name === 'register') {
    next()
  }
  // If user doesnt have a valid token then redirect user to log in page
  else {
    next('/login')
  }
}

export default router
