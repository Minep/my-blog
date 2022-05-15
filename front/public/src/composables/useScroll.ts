import { onMounted, onUnmounted, ref } from "vue";

export default function useScroll() {
    const scrollY = ref(0)
    const scrollX = ref(0)

    function onScrollEvent(e: any) {
        scrollX.value = window.scrollX
        scrollY.value = window.scrollY
    }
    
    onMounted(() => {
        document.addEventListener("scroll", onScrollEvent)
    })

    onUnmounted(() => {
        document.removeEventListener("scroll", onScrollEvent)
    })

    return { scrollX, scrollY }
}