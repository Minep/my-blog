import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { UserToken } from "../interfaces/jwt.interface";
import { UserSession } from "@/dtos";
import { SessionCachingService } from "src/caching/services/session.caching";
import { PublicEndpointModifier } from "../constants";
import { Request } from "express";
import { ApiPermissionDenied, ApiStatus } from "@/api";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor (
        private jwtService: JwtService,
        private session: SessionCachingService,
        private reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            return this.canActivateAsync(context)
        } catch (error) {
            return false
        }
    }

    private async canActivateAsync (context: ExecutionContext) {
        const publicEndpoint = 
            this.reflector.getAllAndOverride<boolean>(PublicEndpointModifier, [context.getHandler()])
                ?? false
        
        const request = context.switchToHttp().getRequest<Request>()

        if (request.method === "OPTIONS") {
            return true
        }

        // no role have been assigned - it's public available
        if (publicEndpoint) {
            return true
        }

        // has valid authorization header?
        const auth = request.headers.authorization?.substring("Bearer ".length)
        if (!auth) {
            throw this.authFailException()
        }

        // is this token valid?
        const token = (await this.jwtService.verifyAsync(auth)) as UserToken
        if (!token) {
            throw this.authFailException()
        }

        // is this token has the corresponding session?
        const userSession = await this.session.tryGetAsync(token.id)
        if (!userSession) {
            throw this.authFailException()
        }

        return true
    }

    private authFailException() {
        return new HttpException({
            message: "noauth"
        }, ApiStatus.AuthFail)
    }
}