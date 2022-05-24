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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClientService = void 0;
const common_1 = require("@nestjs/common");
const Redis = require("ioredis");
const types_interface_1 = require("../interfaces/types.interface");
let RedisClientService = class RedisClientService {
    constructor(redisConfig) {
        this.redis = new Redis({
            host: redisConfig.host,
            port: redisConfig.port,
            password: redisConfig.authPwd
        });
    }
    async set(key, value, options) {
        const val = JSON.stringify(value);
        const param = [];
        if (options.setIfExist) {
            param.push("XX");
        }
        else if (options.setIfNotExist) {
            param.push("NX");
        }
        if (options.retainTTL) {
            param.push("KEEPTTL");
        }
        else if (options.ttl !== undefined) {
            param.push("EX");
            param.push(options.ttl.toString());
        }
        await this.redis.call("SET", key, val, ...param);
    }
    async get(key) {
        try {
            const result = await this.redis.get(key);
            return JSON.parse(result);
        }
        catch (err) {
            return null;
        }
    }
    async del(...key) {
        await this.redis.del(...key);
    }
    async incr(key, d = 1) {
        const result = await this.redis.incrby(key, d);
        return result;
    }
    async decr(key, d = 1) {
        const result = await this.redis.decrby(key, d);
        return result;
    }
    get client() {
        return this.redis;
    }
};
RedisClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(types_interface_1.REDIS_CONFIG)),
    __metadata("design:paramtypes", [Object])
], RedisClientService);
exports.RedisClientService = RedisClientService;
//# sourceMappingURL=redis-client.service.js.map