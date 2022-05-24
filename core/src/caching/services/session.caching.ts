import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/entities/user.entity";
import { UserSession } from "@dto/index";
import { sessionCacheKey } from "../constants/keys.constant";
import { ConfigService } from "@nestjs/config";
import { RedisClientService } from "@redis/services/redis-client.service";

@Injectable()
export class SessionCachingService {
    private sessionTTL: number
    constructor(
        private cache: RedisClientService,
        config: ConfigService
    ) {
        this.sessionTTL = config.get("security.sessionExpiration")
    }

    async setNewAsync (user: UserEntity): Promise<UserSession> {
        const session: UserSession = {
            id: user.id,
            name: user.name
        }
        await this.cache.set(sessionCacheKey(session.id.toString()), session, {
            ttl: this.sessionTTL
        })
        
        return session
    }

    async tryGetAsync (id: number): Promise<UserSession> {
        return await this.cache.get(sessionCacheKey(id.toString()))
    }

    async invalidateAsync (id: number): Promise<void> {
        await this.cache.del(sessionCacheKey(id.toString()))
    }
}