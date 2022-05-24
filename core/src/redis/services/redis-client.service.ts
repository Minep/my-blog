import { Inject, Injectable } from "@nestjs/common";
import * as Redis from "ioredis";
import { RedisClientOptions, REDIS_CONFIG, RedisSetOptions } from "@redis/interfaces/types.interface";

@Injectable()
export class RedisClientService {

    private redis: Redis.Redis

    constructor (
    @Inject(REDIS_CONFIG)
        redisConfig: RedisClientOptions
    ) {
        this.redis = new Redis({
            host: redisConfig.host,
            port: redisConfig.port,
            password: redisConfig.authPwd
        })
    }

    public async set (key: string, value: any, options: RedisSetOptions) {
        const val = JSON.stringify(value)
        const param: string[] = []

        if (options.setIfExist) {
            param.push("XX")
        } else if (options.setIfNotExist) {
            param.push("NX")
        }

        if (options.retainTTL) {
            param.push("KEEPTTL")
        } else if (options.ttl !== undefined) {
            param.push("EX")
            param.push(options.ttl.toString())
        }

        await this.redis.call("SET", key, val, ...param)
    }

    async get<T=any> (key: string): Promise<T> {
        try {
            const result = await this.redis.get(key)
            return JSON.parse(result)
        } catch(err) {
            return null
        }
    }

    async del (...key: string[]) {
        await this.redis.del(...key)
    }

    async incr (key: string, d = 1): Promise<number> {
        const result = await this.redis.incrby(key, d)
        return result
    }

    async decr (key: string, d = 1): Promise<number> {
        const result = await this.redis.decrby(key, d)
        return result
    }

    get client () {
        return this.redis
    }
}