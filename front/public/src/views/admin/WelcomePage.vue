<script setup lang="ts">
import LunaCutieMarkVue from '@/components/LunaCutieMark.vue';
import usePageTitle from '@/composables/usePageTitle';

usePageTitle("欢迎")

</script>

<template>

<section class="h-full flex justify-center items-center">
    <div>
        <LunaCutieMarkVue class="w-[30rem] fill-gray-100">

        </LunaCutieMarkVue>
    </div>
</section>

</template>