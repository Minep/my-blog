import type { AxiosInstance } from "axios"
import { gatewayPublic, gatewayAdmin } from "./gateways"
import { resolve } from "./resolver"
import type { ApiResponse } from "./response"

export const endpointsV1 = {
    article: (aid?: string) => publicEndpoint(`/v1/articles/${aid ?? ''}`),
    category: (cid?: string) => publicEndpoint(`/v1/category/${cid ?? ''}`),
    admin: {
        login: () => adminEndpoint(`/v1/login`),
        stats: () => adminEndpoint(`/v1/admin/stats`),
        category: (cid?: string) => adminEndpoint(`/v1/admin/category/${cid ?? ''}`),
        article: (aid?: string) => adminEndpoint(`/v1/admin/articles/${aid ?? ''}`)
    }
}

const publicEndpoint = (endpointUrl: string) => endpoint(gatewayPublic, endpointUrl)
const adminEndpoint = (endpointUrl: string) => endpoint(gatewayAdmin, endpointUrl)

const endpoint = (gateway: AxiosInstance, endpointUrl: string) => {
    return {
        url: endpointUrl,
        get: <T>(params?: any): Promise<ApiResponse<T>> => {
            return resolve(gateway, "get", endpointUrl, params)
        },
        post: <T>(data?: any): Promise<ApiResponse<T>> => {
            return resolve(gateway, "post", endpointUrl, undefined, data)
        },
        put: <T>(data?: any): Promise<ApiResponse<T>> => {
            return resolve(gateway, "put", endpointUrl, undefined, data)
        },
        delete: <T>(data?: any): Promise<ApiResponse<T>> => {
            return resolve(gateway, "delete", endpointUrl, undefined, data)
        }
    }
}