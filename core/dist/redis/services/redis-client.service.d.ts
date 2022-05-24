import * as Redis from "ioredis";
import { RedisClientOptions, RedisSetOptions } from "@redis/interfaces/types.interface";
export declare class RedisClientService {
    private redis;
    constructor(redisConfig: RedisClientOptions);
    set(key: string, value: any, options: RedisSetOptions): Promise<void>;
    get<T = any>(key: string): Promise<T>;
    del(...key: string[]): Promise<void>;
    incr(key: string, d?: number): Promise<number>;
    decr(key: string, d?: number): Promise<number>;
    get client(): Redis.Redis;
}
