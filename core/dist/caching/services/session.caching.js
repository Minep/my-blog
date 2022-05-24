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
exports.SessionCachingService = void 0;
const common_1 = require("@nestjs/common");
const keys_constant_1 = require("../constants/keys.constant");
const config_1 = require("@nestjs/config");
const redis_client_service_1 = require("../../redis/services/redis-client.service");
let SessionCachingService = class SessionCachingService {
    constructor(cache, config) {
        this.cache = cache;
        this.sessionTTL = config.get("security.sessionExpiration");
    }
    async setNewAsync(user) {
        const session = {
            id: user.id,
            name: user.name
        };
        await this.cache.set((0, keys_constant_1.sessionCacheKey)(session.id.toString()), session, {
            ttl: this.sessionTTL
        });
        return session;
    }
    async tryGetAsync(id) {
        return await this.cache.get((0, keys_constant_1.sessionCacheKey)(id.toString()));
    }
    async invalidateAsync(id) {
        await this.cache.del((0, keys_constant_1.sessionCacheKey)(id.toString()));
    }
};
SessionCachingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_client_service_1.RedisClientService,
        config_1.ConfigService])
], SessionCachingService);
exports.SessionCachingService = SessionCachingService;
//# sourceMappingURL=session.caching.js.map