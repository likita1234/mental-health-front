import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../App.vue'),
      children: [
        {
          path: 'question',
          name: 'manage-questions',
          component: () => import('../components/question/ManageQuestion.vue'),
          meta: {
            breadcrumb: [{ parent: 'Assessments', label: 'Question' }]
          }
        },
        {
          path: 'section',
          name: 'manage-sections',
          component: () => import('../components/section/ManageSection.vue'),
          meta: {
            breadcrumb: [{ parent: 'Assessments', label: 'Section' }]
          }
        },
        {
          path: 'form',
          children: [
            {
              path: '',
              name: 'manage-forms',
              component: () => import('../components/assessment-form/ManageAssessmentForm.vue'),
              meta: {
                breadcrumb: [{ parent: 'Assessments', label: 'Forms' }]
              }
            },
            {
              path: ':id',
              name: 'form-details',
              props: true,
              component: () => import('../components/assessment-form/CustomAssessment.vue'),
              meta: {
                breadcrumb: [{ parent: 'Assessments', label: 'Forms Details' }]
              }
            }
          ]
        }
      ]
    },
    {
      path: '/app',
      component: () => import('../pages/Landing.vue'),
      children: [
        {
          path: '',
          name: 'landing',
          component: () => import('../pages/modules/Home.vue')
        },
        {
          path: '/survey',
          name: 'survey',
          component: () => import('../pages/modules/Survey.vue')
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('../pages/modules/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../pages/modules/Register.vue')
        }
      ]
    },
    {
      // path: '/about',
      // name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    }
  ],
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

// ===========> Route guards
router.beforeEach((to, from, next) => {
  // debugger
  const authStore = useAuthStore()
  // Routes that doesnt need authentication
  const accessibleRoutes = ['login', 'register', 'landing', 'survey']
  // 1) Check if the user has a valid token or not
  const isUserAuthenticated = authStore.isLoggedIn

  // If user is authenticated
  if (isUserAuthenticated) {
    // If user tries to login, redirect to home page (except for when user is trying to register)
    if (to.name === 'login' && to.name !== 'register') {
      next('/')
    } else {
      // Allow navigation to other pages for authenticated users
      next()
    }
  } else {
    // If user is not authenticated
    // If user tries to register, allow navigation to register page
    if (accessibleRoutes.includes(to.name)) {
      next()
    } else {
      // Redirect unauthenticated users to login page
      next('/app')
    }
  }
})

export default router
