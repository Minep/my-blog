import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SessionCachingService } from "src/caching/services/session.caching";
export declare class RefreshTokenGuard implements CanActivate {
    private jwtService;
    private session;
    constructor(jwtService: JwtService, session: SessionCachingService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private verifyToken;
    private noPremissionException;
}
