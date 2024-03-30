import { useAuthStore } from '@/stores/auth'

export function useMenu() {
  const authStore = useAuthStore

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
          visible: true
        }
      ]
    }
  ]

  return {
    menuItems
  }
}
