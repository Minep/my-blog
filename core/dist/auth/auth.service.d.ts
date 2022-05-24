import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { UserEntity } from "@/entities";
import { TokenPair } from "./interfaces/jwt.interface";
import { UserLoginParam, UserSession } from "@/dtos";
import { SessionCachingService } from "src/caching/services/session.caching";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private userRepository;
    private session;
    private jwtService;
    private refreshTokenTTL;
    private accessTokenTTL;
    constructor(userRepository: Repository<UserEntity>, session: SessionCachingService, jwtService: JwtService, config: ConfigService);
    doLogin(loginParam: UserLoginParam): Promise<{
        pair: TokenPair;
        identity: UserSession;
    }>;
    doLogout(session: UserSession): Promise<void>;
    doRefresh(session: UserSession): Promise<{
        pair: TokenPair;
        identity: UserSession;
    }>;
    private issueJwtPair;
}
