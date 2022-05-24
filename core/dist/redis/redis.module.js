"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RedisClientModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClientModule = void 0;
const common_1 = require("@nestjs/common");
const redis_client_service_1 = require("./services/redis-client.service");
const types_interface_1 = require("./interfaces/types.interface");
let RedisClientModule = RedisClientModule_1 = class RedisClientModule {
    static registerAsync(options) {
        return {
            module: RedisClientModule_1,
            imports: options.imports || [],
            providers: [
                redis_client_service_1.RedisClientService,
                this.createOption(options)
            ],
            exports: [
                redis_client_service_1.RedisClientService
            ]
        };
    }
    static createOption(options) {
        if (!options) {
            return {
                provide: types_interface_1.REDIS_CONFIG,
                useValue: {}
            };
        }
        if (options.useFactory) {
            return {
                provide: types_interface_1.REDIS_CONFIG,
                useFactory: options.useFactory,
                inject: options.inject
            };
        }
        return {
            provide: types_interface_1.REDIS_CONFIG,
            useFactory: async (factory) => {
                return await factory.createRedisClientOption();
            },
            inject: [options.useExisting || options.useClass]
        };
    }
};
RedisClientModule = RedisClientModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], RedisClientModule);
exports.RedisClientModule = RedisClientModule;
//# sourceMappingURL=redis.module.js.map