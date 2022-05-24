import { CanActivate, ExecutionContext, HttpException, Injectable, Res } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { refreshCookieName, TokenType } from "src/auth/constants";
import { UserToken } from "../interfaces/jwt.interface";
import { SessionCachingService } from "src/caching/services/session.caching";
import { Request } from "express";
import { ApiPermissionDenied, ApiStatus } from "@/api";

@Injectable()
export class RefreshTokenGuard implements CanActivate {

    constructor (
        private jwtService: JwtService,
        private session: SessionCachingService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest()
        const token = await this.verifyToken(req.cookies[refreshCookieName])
        if (token.type !== TokenType.REFRESH) {
            throw this.noPremissionException()
        }

        const uSession = await this.session.tryGetAsync(token.id)
        if (!uSession) {
            throw this.noPremissionException()
        }

        req.user = uSession
        return true
    }

    private async verifyToken (token: string | undefined): Promise<UserToken> {
        if (!token) {
            throw this.noPremissionException()
        }
        try {
            return await this.jwtService.verifyAsync(token)
        } catch(err) {
            throw this.noPremissionException()
        }
    }

    private noPremissionException() {
        return new HttpException({
            message: "noauth"
        }, ApiStatus.AuthFail)
    }
    
}