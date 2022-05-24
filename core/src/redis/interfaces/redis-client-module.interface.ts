import { ModuleMetadata, Type } from "@nestjs/common";
import { RedisClientOptions } from "src/redis/interfaces/types.interface";

export interface RedisClientOptionFactory {
    createRedisClientOption(): Promise<RedisClientOptions> | RedisClientOptions
}

export interface RedisClientAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    useExisting?: Type<RedisClientOptionFactory>
    useClass?: Type<RedisClientOptionFactory>
    useFactory?: (...args: any[]) => Promise<RedisClientOptions> | RedisClientOptions
    inject?: any[]
}
