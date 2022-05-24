import { ConfigService } from "@nestjs/config";
import { RedisClientService } from "../../redis/services/redis-client.service";
export declare class AccessGuardCachingService {
    private cache;
    private _lockOutTime;
    private _maximumAttempts;
    constructor(cache: RedisClientService, config: ConfigService);
    isBanned(ipAddr: string): Promise<boolean>;
    recordThis(ipAddr: string): Promise<void>;
    get lockOutTime(): number;
}
