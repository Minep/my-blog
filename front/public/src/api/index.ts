import { useNotification } from "@/stores/notifications";
import axios from "axios";
import { appConfig } from "virtual:app-configer";
import { resolve } from "./resolver";
import type { ApiResponse } from "./response";

const gateway = axios.create({
    baseURL: appConfig.apiServer,
    timeout: 4000,
    validateStatus: (status) => status < 400
})

const endpointsV1 = {
    article: (aid: string) => `/v1/article/${aid}`,
    articles: () => "/v1/articles",
    category: (cid: string) => `/v1/category/${cid}`
}

export type ApiProxy = <T>(apiCall: Promise<ApiResponse<T>>, fallback: T) => Promise<T>

export const createApiProxy = () => {
    const notification = useNotification()
    return <T>(apiCall: Promise<ApiResponse<T>>, fallback: T): Promise<T> => {
        return apiCall
                .then((v) => v?.payload ?? fallback)
                .catch((reason: ApiResponse<any>) => {
                    notification.push({
                        level: "error",
                        message: reason.message,
                        elapse: 2
                    })
                    return fallback
                })
    }
}

export const api = Object.freeze({
    gateway: {
        instance: gateway,
        get: <T>(endpoint: string, params?: any): Promise<ApiResponse<T>> => {
            return resolve(gateway, "get", endpoint, params)
        },
        post: <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
            return resolve(gateway, "post", endpoint, undefined, data)
        },
        put: <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
            return resolve(gateway, "put", endpoint, undefined, data)
        },
        delete: <T>(endpoint: string, data?: any): Promise<ApiResponse<T>> => {
            return resolve(gateway, "delete", endpoint, undefined, data)
        }
    },
    v1: endpointsV1
})