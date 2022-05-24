import { DynamicModule } from "@nestjs/common";
import { OSSClientAsyncOptions } from "@3rd/oss/interfaces/oss-module.interface";
export declare class OSSClientModule {
    static registerAsync(options: OSSClientAsyncOptions): DynamicModule;
    private static createOption;
}
