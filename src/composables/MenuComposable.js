import { UserRole } from '@/contants/user-role'
import { authStore } from '@/stores'
import { computed } from 'vue'

export function useMenu() {
  // Computed property to check logged user role
  const loggedUserRole = computed(() => {
    return authStore.userRole
  })

  //   checks if current logged user have the allowed role of not
  const isAccessible = (allowedRoles) => {
    console.log('Allowed roles', allowedRoles)
    console.log('Logged user role', loggedUserRole.value)
    return allowedRoles?.includes(loggedUserRole.value)
  }

  // list of available menu items for the app
  const menuItems = [
    {
      icon: 'pi pi-fw pi-home',
      //   in visiblity: check user role
      items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-database', visible: true }]
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
              to: { name: 'home' },
              visible: true //check user role
            },
            {
              label: 'Manage Sections',
              icon: 'pi pi-fw pi-ellipsis-h',
              to: { name: 'home' },
              visible: true //check user role
            },
            {
              label: 'Manage Forms',
              icon: 'pi pi-fw pi-file-edit',
              to: { name: 'home' },
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
