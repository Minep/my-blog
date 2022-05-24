
export const OSS_CONFIG = Symbol()

export interface OSSClientOptions {
    accessId: string,
    accessKey: string,
    host: string,
    region: string,
    bucket: string,
    ossTokenExpire: number
}
