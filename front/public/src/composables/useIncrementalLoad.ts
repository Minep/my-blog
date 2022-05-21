import type { ItemLoadingResolver } from "@/helpers";
import { computed } from "@vue/reactivity";
import { useScroll, type MaybeRef } from "@vueuse/core";
import { ref, type Ref, watch, onMounted, watchEffect } from "vue";

export default function useIncrementalLoad<T>(
    scrollable: MaybeRef<HTMLElement | Document | undefined | null>, 
    resolver: ItemLoadingResolver<T[]>
) {
    const { arrivedState, isScrolling } = useScroll(scrollable)

    const loading = ref(false)
    const hasMore = ref(true)
    const data: Ref<T[]> = ref([])
    const offset = ref(0)
    const limit = ref(10)

    const reset = () => {
        data.value = []
        offset.value = 0
        load()
    }

    async function load() {
        loading.value = true
        
        const result = await resolver(offset.value, limit.value)
        
        if (result) {
            hasMore.value = result.length > 0
            offset.value += result.length
            data.value.push(...result)
        }
        
        loading.value = false
    }

    watchEffect(() => {
        if (hasMore.value && !loading.value && isScrolling.value && arrivedState.bottom) {
            load()
        }
    })

    return {
        data,
        offset,
        reset,
        limit,
        hasMore,
        loading
    }
}