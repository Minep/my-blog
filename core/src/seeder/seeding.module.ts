import config from "@/config";
import { ArticleEntity, ArticleMetadataEntity, CategoryEntity, UserEntity } from "@/entities";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import SeedingService from "./seeding.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [ config ],
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
            type: "mariadb",
            host: config.get("db.sql.host"),
            port: config.get("db.sql.port"),
            username: config.get("db.sql.username"),
            password: config.get("db.sql.password"),
            database: config.get("db.sql.name"),
            entities: [
                ArticleEntity, ArticleMetadataEntity, CategoryEntity, UserEntity
            ],
            synchronize: true
            })
        }),
        TypeOrmModule.forFeature([ArticleEntity, ArticleMetadataEntity, CategoryEntity, UserEntity])
    ],
    providers:[
        SeedingService
    ],
    exports: [
        SeedingService
    ]
})
export default class SeedingModule { }