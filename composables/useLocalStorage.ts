export function useLocalStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue)
  const error = ref<Error | null>(null)

  const load = () => {
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        data.value = JSON.parse(stored)
      } else {
        data.value = defaultValue
      }
      error.value = null
    } catch (err) {
      console.error(`Error loading ${key} from localStorage:`, err)
      error.value = err instanceof Error ? err : new Error('Unknown error')
      data.value = defaultValue
    }
  }

  const save = (newValue: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue))
      error.value = null
    } catch (err) {
      console.error(`Error saving ${key} to localStorage:`, err)
      error.value = err instanceof Error ? err : new Error('Unknown error')
    }
  }

  load()

  watch(
    () => data.value,
    (newValue) => {
      save(newValue)
    },
    { deep: true }
  )

  return {
    data,
    error,
    load,
    save
  }
}