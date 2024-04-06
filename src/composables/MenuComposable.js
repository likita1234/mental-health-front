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
      label: 'Dashboards',
      //   in visiblity: check user role
      items: [
        {
          label: 'Default Dashboard',
          icon: 'pi pi-fw pi-database',
          visible: true,
          to: { name: 'default-dashboard' }
        },
        {
          label: 'Relationship Analysis',
          icon: 'pi pi-fw pi-sitemap',
          visible: true,
          to: { name: 'relationship-dashboard' }
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
      ]
    },
    {
      icon: 'pi pi-fw pi-file',
      label: 'Manage Assessments',
      items: [
        {
          label: 'Questions',
          icon: 'pi pi-fw pi-question',
          to: { name: 'manage-questions' },
          visible: true //check user role
        },
        {
          label: 'Sections',
          icon: 'pi pi-fw pi-th-large',
          to: { name: 'manage-sections' },
          visible: true //check user role
        },
        {
          label: 'Forms',
          icon: 'pi pi-fw pi-file-edit',
          to: { name: 'manage-forms' },
          visible: true //check user role
        }
      ],
      visible: isAccessible([UserRole.ADMIN, UserRole.SUPERADMIN])
    }
  ]
  return {
    menuItems
  }
}
