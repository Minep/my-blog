import { UserEntity } from "src/entities/user.entity";
import { UserSession } from "@dto/index";
import { ConfigService } from "@nestjs/config";
import { RedisClientService } from "@redis/services/redis-client.service";
export declare class SessionCachingService {
    private cache;
    private sessionTTL;
    constructor(cache: RedisClientService, config: ConfigService);
    setNewAsync(user: UserEntity): Promise<UserSession>;
    tryGetAsync(id: number): Promise<UserSession>;
    invalidateAsync(id: number): Promise<void>;
}
