import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: () => import('../App.vue'),
      children: [
        {
          path: 'dashboard',
          children: [
            {
              path: '',
              name: 'default-dashboard',
              component: () => import('../components/dashboards/DefaultDashboard.vue'),
              meta: {
                breadcrumb: [{ parent: 'Home', label: 'Default Dashboard' }]
              }
            },
            {
              path: 'comparative-dashboards',
              name: 'comparative-dashboards',
              component: () => import('../components/dashboards/ComparativeDashboard.vue'),
              meta: {
                breadcrumb: [{ parent: 'Home', label: 'WHO-5 Index Dashboard' }]
              }
            },
            {
              path: 'section-analysis',
              name: 'section-analysis',
              component: () => import('../components/dashboards/form-section-analysis.vue'),
              meta: {
                breadcrumb: [{ parent: 'Home', label: 'Assessment Form Section-Wise Analysis' }]
              }
            },
            {
              path: 'thematic-analysis',
              name: 'thematic-analysis',
              component: () => import('../components/dashboards/thematic-analysis.vue'),
              meta: {
                breadcrumb: [{ parent: 'Home', label: 'Thematic Analyis of open-end questions' }]
              }
            }
          ]
        },
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
      path: '/home',
      component: () => import('../pages/Landing.vue'),
      children: [
        {
          path: '',
          name: 'landing',
          component: () => import('../pages/modules/Home.vue')
        },
        {
          path: '/survey',
          children: [
            {
              path: '',
              name: 'survey',
              component: () => import('../pages/components/SurveyForms.vue')
            },
            {
              path: ':id',
              name: 'survey-form',
              props: true,
              component: () => import('../pages/components/SurveyAnswerForm.vue')
            }
          ]
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
  const authStore = useAuthStore()
  // Routes that doesnt need authentication
  const accessibleRoutes = ['login', 'register', 'landing', 'survey', 'survey-form']
  // 1) Check if the user has a valid token or not
  const isUserAuthenticated = authStore.isLoggedIn
  // If user is authenticated
  if (isUserAuthenticated) {
    // If user tries to login, redirect to app page (except for when user is trying to register)
    if ((to.name === 'login' || to.name === 'app') && to.name !== 'register') {
      next('/dashboard')
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
      next('/home')
    }
  }
})

export default router
