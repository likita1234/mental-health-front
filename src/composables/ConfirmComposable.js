import { useConfirm } from 'primevue/useconfirm'
// import { showToast } from '@/utils/show-toast'

export function useConfirmComposable() {
  const confirm = useConfirm()

  const confirmRequest = (id, callback, message) => {
    return confirm.require({
      header: 'Confirmation',
      message,
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await callback(id)
      },
      reject: () => {
        // do nothing
      }
    })
  }

  return {
    confirmRequest
  }
}
