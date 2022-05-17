import { computed } from "@vue/reactivity";
import { ref, type Ref } from "vue";

export type PaginationResolver<T> = (offset: number, limit: number) => Promise<T | undefined>

export function usePagination<T, U>(dataKey: keyof T, totalKey: keyof T, resolver: PaginationResolver<T>) {
    const data: Ref<U[]> = ref([])
    const loading = ref(false)
    const totalCount = ref(0)
    const _pageSize = ref(20)
    const _page = ref(1)

    async function doFetch() {
        data.value = []
        loading.value = true
        const result: T | undefined = await resolver((_page.value - 1) * _pageSize.value, _pageSize.value)
        loading.value = false

        if (!result) {
            return
        }
        totalCount.value = (result[totalKey] as unknown) as number
        data.value = (result[dataKey] as unknown) as U[]
    }

    const currentPage = computed<number>({
        get () {
            return _page.value
        },
        set (val) {
            _page.value = val <= 0 ? 1 : val
            doFetch()
        }
    })

    const pageSize = computed<number>({
        get () {
            return _pageSize.value
        },
        set (val) {
            _pageSize.value = val
            doFetch()
        }
    })

    return {
        data,
        loading,
        totalCount,
        currentPage,
        pageSize
    }
}