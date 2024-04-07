import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { AssessmentFormType, UserRole } from '@/constants'

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
              path: 'relationship-dashboard',
              name: 'relationship-dashboard',
              component: () =>
                import('../components/dashboards/mental-health-relationship-analysis.vue'),
              meta: {
                breadcrumb: [{ parent: 'Dashboard', label: 'Mental Health Relationship Analysis' }],
                requiredRoles: [UserRole.ADMIN, UserRole.SUPERADMIN]
              }
            },
            {
              path: 'comparative-dashboard',
              name: 'comparative-dashboards',
              component: () => import('../components/dashboards/comparative-dashboard.vue'),
              meta: {
                breadcrumb: [{ parent: 'Dashboard', label: 'Comparative Dashboard' }],
                requiredRoles: [UserRole.ADMIN, UserRole.SUPERADMIN]
              }
            },
            {
              path: 'section-analysis',
              name: 'section-analysis',
              component: () => import('../components/dashboards/form-section-analysis.vue'),
              meta: {
                breadcrumb: [
                  { parent: 'Dashboard', label: 'Assessment Form Section-Wise Analysis' }
                ],
                requiredRoles: [UserRole.ADMIN, UserRole.SUPERADMIN]
              }
            },
            {
              path: 'thematic-analysis',
              name: 'thematic-analysis',
              component: () => import('../components/dashboards/thematic-analysis.vue'),
              meta: {
                breadcrumb: [{ parent: 'Home', label: 'Thematic Analyis of open-end questions' }],
                requiredRoles: [UserRole.ADMIN, UserRole.SUPERADMIN]
              }
            }
          ]
        },
        {
          path: 'self-assessments',
          name: 'self-assessments',
          props: { type: AssessmentFormType.PRIVATE },
          component: () => import('../pages/components/SurveyForms.vue'),
          meta: {
            breadcrumb: [{ parent: 'Home', label: 'Self Assessments' }]
          }
        },
        {
          path: 'self-assessments/:id',
          name: 'self-assessment-form',
          props: true,
          component: () => import('../pages/components/SurveyAnswerForm.vue')
        },
        {
          path: 'question',
          name: 'manage-questions',
          component: () => import('../components/question/ManageQuestion.vue'),
          meta: {
            breadcrumb: [{ parent: 'Assessments', label: 'Question' }],
            requiredRoles: [UserRole.ADMIN, UserRole.SUPERADMIN]
          }
        },
        {
          path: 'section',
          name: 'manage-sections',
          component: () => import('../components/section/ManageSection.vue'),
          meta: {
            breadcrumb: [{ parent: 'Assessments', label: 'Section' }],
            requiredRoles: [UserRole.ADMIN, UserRole.SUPERADMIN]
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
                breadcrumb: [{ parent: 'Assessments', label: 'Forms' }],
                requiredRoles: [UserRole.ADMIN, UserRole.SUPERADMIN]
              }
            },
            {
              path: ':id',
              name: 'form-details',
              props: true,
              component: () => import('../components/assessment-form/CustomAssessment.vue'),
              meta: {
                breadcrumb: [{ parent: 'Assessments', label: 'Forms Details' }],
                requiredRoles: [UserRole.ADMIN, UserRole.SUPERADMIN]
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
      path: '/access',
      name: 'access',
      component: () => import('../pages/Access.vue')
    },
    {
      path: '/:resource(.*)',
      name: 'not-found',
      props: {
        resource: 'The page you are requesting for does not exist'
      },
      component: () => import('../pages/NotFound.vue')
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
  // Roles who have access to the next route
  const requiredRoles = to?.meta?.requiredRoles
  // 1) Check if the user has a valid token or not
  const isUserAuthenticated = authStore.isLoggedIn
  // If user is authenticated
  if (isUserAuthenticated) {
    // Get logged user role
    const loggedUserRole = authStore.userRole

    // If user tries to login, redirect to app page (except for when user is trying to register)
    if ((to.name === 'login' || to.name === 'app') && to.name !== 'register') {
      next('/dashboard')
    } else {
      // Check if the route requires roles and user have enough role to access the route or not
      if (requiredRoles?.length > 0 && !requiredRoles.includes(loggedUserRole)) {
        router.push({ name: 'access' })
      }
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
