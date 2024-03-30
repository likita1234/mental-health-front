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
      //   in visiblity: check user role
      items: [
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-database',
          visible: true,
          to: { name: 'default-dashboard' }
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
        }
      ]
    },
    {
      items: [
        {
          label: 'Assessments',
          icon: 'pi pi-fw pi-file',
          items: [
            {
              label: 'Manage Questions',
              icon: 'pi pi-fw pi-question',
              to: { name: 'manage-questions' },
              visible: true //check user role
            },
            {
              label: 'Manage Sections',
              icon: 'pi pi-fw pi-ellipsis-h',
              to: { name: 'manage-sections' },
              visible: true //check user role
            },
            {
              label: 'Manage Forms',
              icon: 'pi pi-fw pi-file-edit',
              to: { name: 'manage-forms' },
              visible: true //check user role
            }
          ],
          visible: isAccessible([UserRole.ADMIN, UserRole.SUPERADMIN])
        }
      ]
    }
  ]
  return {
    menuItems
  }
}
