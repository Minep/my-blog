import { api, ApiProxyKeyOperational, createOperationalApiProxy, type ApiProxy } from "@/api";
import type { UserIdentity } from "@/api/dtos";
import { defineStore } from "pinia";
import { inject } from "vue";

export const useIdentity = defineStore({
    id: "identity",
    state: () : UserIdentity => ({
        id: "",
        name: ""
    }),
    getters: {
        identity: (state) => ({
            ...state
        }),
        hasIdentity: (state) => state.id && state.name
    },
    actions: {
        async login(uname: string, password: string) {
            const proxy = createOperationalApiProxy()
            const result = await proxy(api.v1.admin.login().post<UserIdentity>({
                name: uname,
                password: password
            }))
            
            if (!result) {
                throw "login fail"
            }

            this.id = result.id
            this.name = result.name
        }
    }
})