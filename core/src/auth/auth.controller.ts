/* eslint-disable @typescript-eslint/indent */
import { Controller, Post, Body, Response, Session } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CookieOptions, Response as ServerResponse } from "express";
import { LimitedAttempts } from "@/common/decorator/access.decorator";
import { Protected, Public, RefreshEndpoint } from "@/common/decorator/auth.decorator";
import { UserLoginParam, UserSession } from "@/dtos";
import { refreshCookieName } from "./constants";


@Controller({
    version: "1"
})
@Protected()
export class AuthController {
    private cookieOptions: CookieOptions

    constructor (
        private service: AuthService
    ) {
        this.cookieOptions = {
            httpOnly: true,
            path: "/v1/refresh",
            sameSite: "lax",
            secure: true
        }
    }

    @Post("login")
    @Public()
    @LimitedAttempts()
    async loginUser (
        @Body() loginParam: UserLoginParam,
        @Response() response: ServerResponse
    ) {
        const { pair, identity } = await this.service.doLogin(loginParam)
        if (pair.refreshToken) {
            response.cookie(refreshCookieName, pair.refreshToken, this.cookieOptions)
        }

        return {
            access: pair.accessToken,
            holder: identity
        }
    }

    @Post("refresh")
    @RefreshEndpoint()
    async refreshUser (@Session() session: UserSession) {
        const { pair, identity } = await this.service.doRefresh(session)
        return {
            access: pair.accessToken,
            holder: identity
        }
    }

    @Post("logout")
    async logout (
        @Session() session: UserSession,
        @Response() response: ServerResponse
    ) {
        await this.service.doLogout(session)
        response.clearCookie(refreshCookieName, this.cookieOptions)
        return response.send()
    }
}