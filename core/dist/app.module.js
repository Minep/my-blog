"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const oss_module_1 = require("./third-party/oss/oss.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const auth_guard_1 = require("./auth/guards/auth.guard");
const caching_module_1 = require("./caching/caching.module");
const config_2 = require("./config");
const article_controller_1 = require("./controllers/article.controller");
const category_controller_1 = require("./controllers/category.controller");
const stats_controller_1 = require("./controllers/stats.controller");
const article_entity_1 = require("./entities/article.entity");
const category_entity_1 = require("./entities/category.entity");
const user_entity_1 = require("./entities/user.entity");
const redis_module_1 = require("./redis/redis.module");
const article_service_1 = require("./services/article.service");
const category_service_1 = require("./services/category.service");
const stats_service_1 = require("./services/stats.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [config_2.default],
                isGlobal: true
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
                    type: "mariadb",
                    host: config.get("db.sql.host"),
                    port: config.get("db.sql.port"),
                    username: config.get("db.sql.username"),
                    password: config.get("db.sql.password"),
                    database: config.get("db.sql.name"),
                    entities: [
                        article_entity_1.ArticleEntity, article_entity_1.ArticleMetadataEntity, category_entity_1.CategoryEntity, user_entity_1.UserEntity
                    ],
                    bigNumberStrings: false,
                    synchronize: true
                })
            }),
            redis_module_1.RedisClientModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
                    host: config.get("db.redis.host"),
                    port: config.get("db.redis.port"),
                    authPwd: config.get("db.redis.password")
                })
            }),
            oss_module_1.OSSClientModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
                    host: config.get("oss.host"),
                    region: config.get("oss.region"),
                    accessId: config.get("oss.accessId"),
                    accessKey: config.get("oss.accessKey"),
                    bucket: config.get("oss.bucket"),
                    ossTokenExpire: config.get("oss.expire")
                })
            }),
            typeorm_1.TypeOrmModule.forFeature([article_entity_1.ArticleEntity, article_entity_1.ArticleMetadataEntity, category_entity_1.CategoryEntity, user_entity_1.UserEntity]),
            caching_module_1.CachingModule,
            auth_module_1.AuthModule,
        ],
        controllers: [
            category_controller_1.default,
            article_controller_1.default,
            stats_controller_1.default
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard
            },
            category_service_1.default,
            article_service_1.default,
            stats_service_1.default
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map