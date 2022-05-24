export declare const OSS_CONFIG: unique symbol;
export interface OSSClientOptions {
    accessId: string;
    accessKey: string;
    host: string;
    region: string;
    bucket: string;
    ossTokenExpire: number;
}
