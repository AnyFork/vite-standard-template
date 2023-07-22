/**
 * demo
 */
export const useCounterStore = defineStore(
    'counter',
    () => {
        const count = ref(0)
        const increment = (): void => {
            count.value++
        }
        return { count, increment }
    },
    {
        persist: true
    }
)
