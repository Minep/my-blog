<script setup lang="ts">
import useScroll from '@/composables/useScroll';
import { onMounted, ref, watchEffect } from 'vue';


const { scrollX, scrollY } = useScroll()
const setAffix = ref(false)
const affixContainer = ref<HTMLDivElement | null>(null)
const containerOffset = { offsetY: 0 }

onMounted(() => {
    containerOffset.offsetY = (affixContainer.value?.offsetTop ?? 0)
})

watchEffect(() => {
    setAffix.value = scrollY.value > containerOffset.offsetY
})

</script>

<template>
    <div class="flex flex-row justify-center p-10" ref="affixContainer">
        <section class="aside-container relative">
            <div :class="{ affix: setAffix, 'aside-container': setAffix }">
                <slot name="aside"/>
            </div>
        </section>
        <section class="grow h-fit px-10 box-border">
            <slot name="column"/>
        </section>
    </div>
</template>

<style>
.aside-container {
    @apply w-1/3 h-fit;
}
.affix {
    @apply fixed left-0 top-0 p-10;
}
</style>