<script setup lang="ts">
import usePageTitle from "@/composables/usePageTitle";
import { useIdentity } from "@/stores/identity";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import SiteLogo from "../../components/SiteLogo.vue";

const loginFormData = reactive({
    userName: "",
    password: ""
})

const onAction = ref(false)

const identity = useIdentity()
const router = useRouter()

usePageTitle("登录")

function onLogin() {
    onAction.value = true
    identity
        .login(loginFormData.userName, loginFormData.password)
            .then(() => {
                setTimeout(() => router.push({
                    path: "/admin"
                }), 500)
            })
            .finally(() => {
                onAction.value = false
            })
}

</script>

<template>
    <section class="relative w-screen h-screen flex justify-center items-center bg-paper-400">
        <div class="p-10 bg-paper-500 bg-opacity-50 flex flex-col text-center">
            <SiteLogo class="text-4xl mb-8"/>
            <div class="space-y-5 flex flex-col">
                <input v-model="loginFormData.userName" class=" border-black
                     border-b-2 bg-transparent px-2 pt-2 focus:border-b-4 focus:bg-paper-500 focus:outline-none
                " placeholder="用户名">

                <input type="password" v-model="loginFormData.password" class=" border-black
                     border-b-2 bg-transparent px-2 pt-2 focus:border-b-4 focus:bg-paper-500 focus:outline-none
                " placeholder="密码">

            </div>
            <button class="bg-paper-500 font-serif font-bold py-3 
                hover:bg-black hover:text-white text-lg mt-6 
                 disabled:opacity-70 disabled:bg-black disabled:text-white"
                    @click="onLogin" :disabled="onAction">
                {{ !onAction ? "登 录" : "登录中..." }}        
            </button>
        </div>
    </section>
</template>

<style>
</style>