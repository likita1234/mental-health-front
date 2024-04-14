import { UserRole } from '@/constants/user-role'
import { authStore } from '@/stores'
import { computed } from 'vue'

export function useMenu() {
  // Computed property to check logged user role
  const loggedUserRole = computed(() => {
    return authStore.userRole
  })

  //   checks if current logged user have the allowed role of not
  const isAccessible = (allowedRoles) => {
    return allowedRoles?.includes(loggedUserRole.value)
  }

  // list of available menu items for the app
  const menuItems = [
    {
      icon: 'pi pi-fw pi-home',
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          visible: true,
          to: { name: 'default-dashboard' }
        },
        {
          label: 'Self Assessments',
          icon: 'pi pi-fw pi-table',
          visible: isAccessible([UserRole.USER]),
          to: { name: 'self-assessments' }
        },
        {
          label: 'Self Assessments Dashboard',
          icon: 'pi pi-fw pi-chart-pie',
          visible: false,
          to: { name: 'self-assessment-dashboard' }
        }
      ]
    },
    {
      icon: 'pi pi-fw pi-home',
      label: 'Dashboards',
      items: [
        {
          label: 'Relationship Analysis',
          icon: 'pi pi-fw pi-sitemap',
          visible: true,
          to: { name: 'relationship-dashboard' }
        },
        {
          label: 'Submission Correlation Analysis',
          icon: 'pi pi-fw pi-chart-line',
          visible: true,
          to: { name: 'submission-correlation-dashboard' }
        },
        {
          label: 'Comparative Analysis',
          icon: 'pi pi-fw pi-chart-bar',
          visible: true,
          to: { name: 'comparative-dashboards' }
        },
        {
          label: 'Section Analysis',
          icon: 'pi pi-fw pi-table',
          visible: true,
          to: { name: 'section-analysis' }
        },
        {
          label: 'Keywords Analysis',
          icon: 'pi pi-fw pi-key',
          visible: true,
          to: { name: 'thematic-analysis' }
        }
      ],
      visible: isAccessible([UserRole.ADMIN, UserRole.SUPERADMIN])
    },
    {
      icon: 'pi pi-fw pi-file',
      label: 'Manage Assessments',
      items: [
        {
          label: 'Questions',
          icon: 'pi pi-fw pi-question',
          to: { name: 'manage-questions' },
          visible: true
        },
        {
          label: 'Sections',
          icon: 'pi pi-fw pi-th-large',
          to: { name: 'manage-sections' },
          visible: true
        },
        {
          label: 'Forms',
          icon: 'pi pi-fw pi-file-edit',
          to: { name: 'manage-forms' },
          visible: true
        }
      ],
      visible: isAccessible([UserRole.ADMIN, UserRole.SUPERADMIN])
    }
  ]
  return {
    menuItems
  }
}
