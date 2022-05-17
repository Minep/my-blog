import { useNotification } from "@/stores/notifications";
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { appConfig } from "virtual:app-configer";
import { endpointsV1 } from "./endpoints";
import { resolve } from "./resolver";
import type { ApiResponse } from "./response";


export const ApiProxyKey = Symbol("API_PROXY")
export const ApiProxyKeyOperational = Symbol("API_PROXY_OPS")

export type ApiProxy = <T>(apiCall: Promise<ApiResponse<T>>, fallback?: T) => Promise<T | undefined>

export const createApiProxy = () => {
    const notification = useNotification()
    return <T>(apiCall: Promise<ApiResponse<T>>, fallback?: T): Promise<T | undefined> => {
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

export const createOperationalApiProxy = () => {
    const notification = useNotification()
    return <T>(apiCall: Promise<ApiResponse<T>>, fallback?: T): Promise<T | undefined> => {
        return apiCall
                .then((v) => {
                    notification.push({
                        level: "success",
                        message: `操作成功（应答：${v.message}）`,
                        elapse: 2
                    })
                    return v?.payload ?? fallback
                })
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
    v1: endpointsV1
})