import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { SessionCachingService } from "src/caching/services/session.caching";
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private session;
    private reflector;
    constructor(jwtService: JwtService, session: SessionCachingService, reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    private canActivateAsync;
    private authFailException;
}
