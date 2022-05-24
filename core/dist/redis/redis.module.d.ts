import { DynamicModule } from "@nestjs/common";
import { RedisClientAsyncOptions } from "src/redis/interfaces/redis-client-module.interface";
export declare class RedisClientModule {
    static registerAsync(options: RedisClientAsyncOptions): DynamicModule;
    private static createOption;
}
