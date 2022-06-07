import axios, { type AxiosRequestConfig } from "axios"
import { appConfig } from "virtual:app-configer"

const gatewayConfig: AxiosRequestConfig = {
    baseURL: appConfig.apiServer,
    timeout: 4000,
    validateStatus: (status) => status < 400
}

export const gatewayPublic = axios.create(gatewayConfig)

export const gatewayAdmin = axios.create({
    ...gatewayConfig,
    withCredentials: true
})

export const gatewayAliOSS = axios.create({
    ...gatewayConfig,
    baseURL: appConfig.ossServer
})