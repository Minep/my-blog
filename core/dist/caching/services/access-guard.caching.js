"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessGuardCachingService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const keys_constant_1 = require("../constants/keys.constant");
const redis_client_service_1 = require("../../redis/services/redis-client.service");
let AccessGuardCachingService = class AccessGuardCachingService {
    constructor(cache, config) {
        this.cache = cache;
        this._lockOutTime = config.get("security.lockOutTime");
        this._maximumAttempts = config.get("security.maxAttempts");
    }
    async isBanned(ipAddr) {
        const number = parseInt(await this.cache.get((0, keys_constant_1.guardedAddrCacheKey)(ipAddr)));
        return number >= this._maximumAttempts;
    }
    async recordThis(ipAddr) {
        const key = (0, keys_constant_1.guardedAddrCacheKey)(ipAddr);
        const result = await this.cache.incr(key);
        if (result === 1) {
            await this.cache.client.expire(key, this._lockOutTime);
        }
    }
    get lockOutTime() {
        return this._lockOutTime;
    }
};
AccessGuardCachingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_client_service_1.RedisClientService,
        config_1.ConfigService])
], AccessGuardCachingService);
exports.AccessGuardCachingService = AccessGuardCachingService;
//# sourceMappingURL=access-guard.caching.js.map