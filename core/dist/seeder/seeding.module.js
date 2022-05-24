"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const entities_1 = require("../entities");
const common_1 = require("@nestjs/common");
const config_2 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const seeding_service_1 = require("./seeding.service");
let SeedingModule = class SeedingModule {
};
SeedingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_2.ConfigModule.forRoot({
                load: [config_1.default],
                isGlobal: true
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_2.ConfigService],
                useFactory: async (config) => ({
                    type: "mariadb",
                    host: config.get("db.sql.host"),
                    port: config.get("db.sql.port"),
                    username: config.get("db.sql.username"),
                    password: config.get("db.sql.password"),
                    database: config.get("db.sql.name"),
                    entities: [
                        entities_1.ArticleEntity, entities_1.ArticleMetadataEntity, entities_1.CategoryEntity, entities_1.UserEntity
                    ],
                    synchronize: true
                })
            }),
            typeorm_1.TypeOrmModule.forFeature([entities_1.ArticleEntity, entities_1.ArticleMetadataEntity, entities_1.CategoryEntity, entities_1.UserEntity])
        ],
        providers: [
            seeding_service_1.default
        ],
        exports: [
            seeding_service_1.default
        ]
    })
], SeedingModule);
exports.default = SeedingModule;
//# sourceMappingURL=seeding.module.js.map