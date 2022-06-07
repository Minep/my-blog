import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "@/entities";
import * as bcrypt from "bcrypt";
import { UserToken, TokenPair } from "./interfaces/jwt.interface";
import { UserLoginParam, UserSession } from "@/dtos";
import { TokenType } from "./constants";
import { SessionCachingService } from "src/caching/services/session.caching";
import { ConfigService } from "@nestjs/config";
import { ApiPermissionDenied } from "@/api";

@Injectable()
export class AuthService {
    private refreshTokenTTL: number
    private accessTokenTTL: number

    constructor (
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private session: SessionCachingService,
        private jwtService : JwtService,
        config: ConfigService
    ) {
        this.refreshTokenTTL = config.get("security.refreshExpire")
        this.accessTokenTTL = config.get("security.sessionExpire")
    }

    async doLogin (loginParam: UserLoginParam): Promise<{
        pair: TokenPair
        identity: UserSession
    }> {
        const user = await this.userRepository.findOne({
            where: {
                name: loginParam.name
            },
            select: ["id", "name", "password"]
        })

        if (!user) {
            throw ApiPermissionDenied("loginFailed")
        }

        if (!(await bcrypt.compare(loginParam.password, user.password))) {
            throw ApiPermissionDenied("loginFailed")
        }
        
        let userSession = await this.session.tryGetAsync(user.id)
        if (!userSession) {
            userSession = await this.session.setNewAsync(user)
        }
        
        return {
            pair: {
                accessToken: await this.issueJwtPair(userSession, TokenType.ACCESS),
                refreshToken: await this.issueJwtPair(userSession, TokenType.REFRESH),
            },
            identity: {
                id: user.id,
                name: user.name
            }
        }
    }

    async doLogout (session: UserSession) {
        await this.session.invalidateAsync(session.id)
    }

    async doRefresh (session: UserSession): Promise<{
        pair: TokenPair
        identity: UserSession
    }> {
        const user = await this.userRepository.findOne({
            where: {
                id: session.id
            },
            select: ["id", "name"]
        })

        return {
            pair: {
                accessToken: await this.issueJwtPair(session, TokenType.ACCESS)
            },
            identity: {
                id: user.id,
                name: user.name
            }
        }
    }

    private issueJwtPair (user: UserSession, tokenType: TokenType) {
        const token: UserToken = {
            id: user.id,
            type: tokenType
        }
        const expire = 
            (tokenType === TokenType.ACCESS) 
                ? this.accessTokenTTL
                : this.refreshTokenTTL;
        
        return this.jwtService.signAsync(token, {
            expiresIn: expire
        })
    }
}