import type { AxiosInstance, Method } from "axios";
import type { ApiResponse } from "./response";

export async function resolve<T>(
    gateway: AxiosInstance, 
    method: Method, 
    endpoint: string, 
    params?: any,
    data?: any): Promise<ApiResponse<T>> {
        try {
            const response = await gateway({
                method: method,
                url: endpoint,
                params: params,
                data: data
            })
    
            return {
                code: response.status,
                ...response.data
            } as ApiResponse<T>
        }
        catch(reason: any) {
            console.log(reason)
            if (reason.response) {
                throw {
                    code: reason.response.status,
                    ...reason.response.data
                } as ApiResponse<T>
            }
            
            throw {
                message: "Unknown Error",
                code: 0
            } as ApiResponse<T>
        }
    }