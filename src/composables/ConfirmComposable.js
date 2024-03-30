import { useConfirm } from 'primevue/useconfirm'
// import { showToast } from '@/utils/show-toast'

export function useConfirmComposable() {
  const confirm = useConfirm()

  const confirmRequest = (id, callback, message) => {
    confirm.require({
      header: 'Confirmation',
      message,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        callback(id)
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
