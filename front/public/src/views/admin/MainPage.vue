<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import SiteLogo from '@/components/SiteLogo.vue';
import {
    DataLine,
    Document,
    Picture
} from '@element-plus/icons-vue'
import { useIdentity } from '@/stores/identity';
import { useNotification } from '@/stores/notifications';

const identity = useIdentity()
const router = useRouter()
const notification = useNotification()

const doLogout = () => {
    identity.logout().then(() => {
        router.go(0)
    })
    .catch((err) => {
        notification.error(`无法登出：${err}`)
    })
}

</script>

<template>
<ElContainer class="h-screen bg-gray-50">
    <ElAside>
        <ElMenu class="h-screen" router>
            <li class="text-center py-5">
                <SiteLogo class="text-3xl"/>
            </li>
            <ElMenuItem index="/admin/site-stats" class="space-x-2">
                <ElIcon><DataLine/></ElIcon>
                站点统计
            </ElMenuItem>
            <ElMenuItem index="/admin/my-articles" class="space-x-2">
                <ElIcon><Document/></ElIcon>
                我的文章
            </ElMenuItem>
            <ElMenuItem index="/admin/my-imgbed" class="space-x-2">
                <ElIcon><Picture/></ElIcon>
                我的图床
            </ElMenuItem>
            <ElMenuItem index="" @click="doLogout()" class="space-x-2 mt-10 ">
                <p class="text-red-500">退出登录</p>
            </ElMenuItem>
        </ElMenu>
    </ElAside>
    <ElMain class="max-h-screen !p-0" ref="showcase">
        <RouterView></RouterView>
    </ElMain>
</ElContainer>
</template>