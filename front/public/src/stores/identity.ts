import { api, createApiProxy, createOperationalApiProxy, type ApiProxy } from "@/api";
import type { UserIdentity, UserLoginResult } from "@/api/dtos";
import { gatewayAdmin } from "@/api/gateways";
import { defineStore } from "pinia";

export const useIdentity = defineStore({
    id: "identity",
    state: () : {
        id: UserIdentity,
        attempted: boolean
    } => ({
        id: {
            id: "",
            name: ""
        },
        attempted: false
    }),
    getters: {
        identity: (state) => ({
            ...state.id
        }),
        hasIdentity: (state) => state.id.id && state.id.name && state.attempted
    },
    actions: {
        async login(uname: string, password: string) {
            const proxy = createOperationalApiProxy()
            const result = await proxy(api.v1.login().post<UserLoginResult>({
                name: uname,
                password: password
            }))
            
            if (!result) {
                throw "login fail"
            }

            this.id = { ...result.holder }
            gatewayAdmin.defaults.headers.common["Authorization"] = `Bearer ${result.access}`
        },
        
        async refresh() {
            if (this.hasIdentity) {
                return
            }

            this.attempted = true
            const result = (await api.v1.admin.refresh().post<UserLoginResult>()).payload

            if (!result) {
                this.id = { name: '', id: '' }
                return
            }

            gatewayAdmin.defaults.headers.common["Authorization"] = `Bearer ${result.access}`
            this.id = { ...result.holder }
        },

        async logout() {
            await api.v1.admin.logout().post();
        }
    }
})