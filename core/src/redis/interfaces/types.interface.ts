export const REDIS_CONFIG = Symbol("REDIS_CONFIG")

export interface RedisClientOptions {
    host: string,
    port: number,
    authPwd?: string
}

export interface RedisSetOptions {
    ttl?: number
    retainTTL?: boolean
    setIfNotExist?: boolean
    setIfExist?: boolean
}