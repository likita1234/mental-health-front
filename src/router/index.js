import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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

// ===========> Route guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  // 1) Check if the user has a valid token or not
  const isUserAuthenticated = authStore.isLoggedIn
  // If user is logged in and has a valid token then proceed user to go where he/she wants
  // If user wants to register then its okay to let them go there
  if (isUserAuthenticated && to.name === 'login') {
    next('/')
  } else if (!isUserAuthenticated) {
    if (to.name !== 'login') {
      next('/login')
    }
  }
  next()
})

export default router
