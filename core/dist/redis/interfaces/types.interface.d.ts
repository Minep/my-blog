export declare const REDIS_CONFIG: unique symbol;
export interface RedisClientOptions {
    host: string;
    port: number;
    authPwd?: string;
}
export interface RedisSetOptions {
    ttl?: number;
    retainTTL?: boolean;
    setIfNotExist?: boolean;
    setIfExist?: boolean;
}
