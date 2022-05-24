import { DynamicModule, Module, Provider, Global } from "@nestjs/common";
import { RedisClientService } from "./services/redis-client.service";
import { REDIS_CONFIG } from "./interfaces/types.interface";
import { RedisClientAsyncOptions } from "src/redis/interfaces/redis-client-module.interface";
import { RedisClientOptionFactory } from "./interfaces/redis-client-module.interface";

@Global()
@Module({})
export class RedisClientModule {
    static registerAsync (options: RedisClientAsyncOptions): DynamicModule {
        return {
            module: RedisClientModule,
            imports: options.imports || [],
            providers: [
                RedisClientService,
                this.createOption(options)
            ],
            exports: [
                RedisClientService
            ]
        }
    }

    private static createOption (options: RedisClientAsyncOptions): Provider<any> {
        if (!options) {
            return {
                provide: REDIS_CONFIG,
                useValue: {}
            }
        }
        
        if (options.useFactory) {
            return {
                provide: REDIS_CONFIG,
                useFactory: options.useFactory,
                inject: options.inject
            }
        }

        return {
            provide: REDIS_CONFIG,
            useFactory: async (factory: RedisClientOptionFactory) => {
                return await factory.createRedisClientOption()
            },
            inject: [options.useExisting || options.useClass]
        }
    }
}