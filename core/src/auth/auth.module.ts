import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@/entities";

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                secret: config.get("security.jwtSecret")
            })
        }),
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [
        AuthService, 
        JwtModule
    ]
})
export class AuthModule { }