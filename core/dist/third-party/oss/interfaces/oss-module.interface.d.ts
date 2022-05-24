import { ModuleMetadata, Type } from "@nestjs/common";
import { OSSClientOptions } from "./oss-config.interface";
export interface OSSClientOptionFactory {
    createOSSClientOption(): Promise<OSSClientOptions> | OSSClientOptions;
}
export interface OSSClientAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    useExisting?: Type<OSSClientOptionFactory>;
    useClass?: Type<OSSClientOptionFactory>;
    useFactory?: (...args: any[]) => Promise<OSSClientOptions> | OSSClientOptions;
    inject?: any[];
}
