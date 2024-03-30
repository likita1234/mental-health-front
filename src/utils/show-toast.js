import EventBus from './event-bus'

export function showToast(severity, summary, message) {
  EventBus.emit('show-toast', {
    severity: severity ?? 'error',
    summary: summary ?? 'Invalid',
    message: message ?? 'Something went wrong'
  })
}
