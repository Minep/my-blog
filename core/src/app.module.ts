import { OSSClientModule } from '@3rd/oss/oss.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { CachingModule } from './caching/caching.module';
import config from './config';
import ArticleController from './controllers/article.controller';
import CategoryController from './controllers/category.controller';
import SiteStatisticsController from './controllers/stats.controller';
import { ArticleEntity, ArticleMetadataEntity } from './entities/article.entity';
import { CategoryEntity } from './entities/category.entity';
import { UserEntity } from './entities/user.entity';
import { RedisClientModule } from './redis/redis.module';
import ArticleService from './services/article.service';
import CategoryService from './services/category.service';
import SiteStatisticsService from './services/stats.service';

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
        bigNumberStrings: false,
        synchronize: true
      })
    }),
    RedisClientModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        host: config.get("db.redis.host"),
        port: config.get("db.redis.port"),
        authPwd: config.get("db.redis.password")
      })
    }),
    OSSClientModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        host: config.get("oss.host"),
        region: config.get("oss.region"),
        accessId: config.get("oss.accessId"),
        accessKey: config.get("oss.accessKey"),
        bucket: config.get("oss.bucket"),
        ossTokenExpire: config.get("oss.expire")
      })
    }),
    TypeOrmModule.forFeature([ArticleEntity, ArticleMetadataEntity, CategoryEntity, UserEntity]),
    CachingModule,
    AuthModule,
  ],
  controllers: [
    CategoryController,
    ArticleController,
    SiteStatisticsController
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    CategoryService,
    ArticleService,
    SiteStatisticsService
  ],
})
export class AppModule {}
