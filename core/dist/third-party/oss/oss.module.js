"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OSSClientModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OSSClientModule = void 0;
const common_1 = require("@nestjs/common");
const oss_config_interface_1 = require("./interfaces/oss-config.interface");
const oss_service_1 = require("./oss.service");
let OSSClientModule = OSSClientModule_1 = class OSSClientModule {
    static registerAsync(options) {
        var _a;
        return {
            module: OSSClientModule_1,
            imports: [
                ...((_a = options.imports) !== null && _a !== void 0 ? _a : [])
            ],
            providers: [
                oss_service_1.OSSClientService,
                this.createOption(options)
            ],
            exports: [
                oss_service_1.OSSClientService
            ]
        };
    }
    static createOption(options) {
        if (!options) {
            return {
                provide: oss_config_interface_1.OSS_CONFIG,
                useValue: {}
            };
        }
        if (options.useFactory) {
            return {
                provide: oss_config_interface_1.OSS_CONFIG,
                useFactory: options.useFactory,
                inject: options.inject
            };
        }
        return {
            provide: oss_config_interface_1.OSS_CONFIG,
            useFactory: async (factory) => {
                return await factory.createOSSClientOption();
            },
            inject: [options.useExisting || options.useClass]
        };
    }
};
OSSClientModule = OSSClientModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], OSSClientModule);
exports.OSSClientModule = OSSClientModule;
//# sourceMappingURL=oss.module.js.map