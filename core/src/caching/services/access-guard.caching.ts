import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { guardedAddrCacheKey } from "../constants/keys.constant";
import { RedisClientService } from "../../redis/services/redis-client.service";

@Injectable()
export class AccessGuardCachingService {
    private _lockOutTime: number
    private _maximumAttempts: number
    
    constructor (
        private cache: RedisClientService,
        config: ConfigService
    ) {
        this._lockOutTime = config.get("security.lockOutTime")
        this._maximumAttempts = config.get("security.maxAttempts")
    }

    async isBanned (ipAddr: string): Promise<boolean> {
        const number = parseInt(await this.cache.get(guardedAddrCacheKey(ipAddr)))
        return number >= this._maximumAttempts
    }

    async recordThis (ipAddr: string) {
        const key = guardedAddrCacheKey(ipAddr)
        const result = await this.cache.incr(key)
        if (result === 1) {
            // if it is 1, then which mean this key is newly added
            // we shall define a expiration on it
            await this.cache.client.expire(key, this._lockOutTime)
        }
    }

    get lockOutTime () {
        return this._lockOutTime
    }
}