interface Toast {
  id: number
  title: string
  message: string
  variant: 'default' | 'success' | 'failed' | 'warning'
}

const toasts = ref<Toast[]>([])
let toastId = 0

export function useToast() {
  const addToast = (
    title: string,
    message: string,
    variant: Toast['variant'] = 'default'
  ) => {
    const id = toastId++
    const toast: Toast = {
      id,
      title,
      message,
      variant
    }
    toasts.value.push(toast)

    setTimeout(() => {
      dismissToast(id)
    }, 5000)
  }

  const dismissToast = (id: number) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toasts,
    addToast,
    dismissToast
  }
}