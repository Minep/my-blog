"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../constants");
const session_caching_1 = require("../../caching/services/session.caching");
const api_1 = require("../../api");
let RefreshTokenGuard = class RefreshTokenGuard {
    constructor(jwtService, session) {
        this.jwtService = jwtService;
        this.session = session;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const token = await this.verifyToken(req.cookies[constants_1.refreshCookieName]);
        if (token.type !== constants_1.TokenType.REFRESH) {
            throw this.noPremissionException();
        }
        const uSession = await this.session.tryGetAsync(token.id);
        if (!uSession) {
            throw this.noPremissionException();
        }
        req.user = uSession;
        return true;
    }
    async verifyToken(token) {
        if (!token) {
            throw this.noPremissionException();
        }
        try {
            return await this.jwtService.verifyAsync(token);
        }
        catch (err) {
            throw this.noPremissionException();
        }
    }
    noPremissionException() {
        return new common_1.HttpException({
            message: "noauth"
        }, api_1.ApiStatus.AuthFail);
    }
};
RefreshTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        session_caching_1.SessionCachingService])
], RefreshTokenGuard);
exports.RefreshTokenGuard = RefreshTokenGuard;
//# sourceMappingURL=refresh.guard.js.map