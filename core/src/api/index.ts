
export enum ApiStatus {
    OK = 200,
    OpFailure = 400,
    AuthFail = 403,
    NotFound = 404,
    TooManyReqs = 429
}

export interface ApiResult {
    message: string;
    payload: any;
}

export function failed(message?: string, payload?: any) {
    return ApiException(ApiStatus.OpFailure, message, payload)
}

export function notFound(message?: string, payload?: any) {
    return ApiException(ApiStatus.NotFound, message, payload)
}

export function ApiPermissionDenied(message?: string, payload?: any) {
    return ApiException(ApiStatus.AuthFail, message, payload)
}

export function ApiException(status: ApiStatus, message?: string, payload?: any) {
    return {
        status: status,
        msg: message ?? 'error',
        payload: payload
    }
}