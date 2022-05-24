import { DynamicModule, Module, Provider, Global } from "@nestjs/common";
import { OSS_CONFIG } from "@3rd/oss/interfaces/oss-config.interface";
import { OSSClientAsyncOptions, OSSClientOptionFactory } from "@3rd/oss/interfaces/oss-module.interface";
import { OSSClientService } from "@3rd/oss/oss.service";

@Global()
@Module({})
export class OSSClientModule {
    static registerAsync (options: OSSClientAsyncOptions): DynamicModule {
        return {
            module: OSSClientModule,
            imports: [
                ...(options.imports ?? [])
            ],
            providers: [
                OSSClientService,
                this.createOption(options)
            ],
            exports: [
                OSSClientService
            ]
        }
    }

    private static createOption (options: OSSClientAsyncOptions): Provider<any> {
        if (!options) {
            return {
                provide: OSS_CONFIG,
                useValue: {}
            }
        }
        
        if (options.useFactory) {
            return {
                provide: OSS_CONFIG,
                useFactory: options.useFactory,
                inject: options.inject
            }
        }

        return {
            provide: OSS_CONFIG,
            useFactory: async (factory: OSSClientOptionFactory) => {
                return await factory.createOSSClientOption()
            },
            inject: [options.useExisting || options.useClass]
        }
    }
}