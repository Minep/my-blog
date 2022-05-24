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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const session_caching_1 = require("../../caching/services/session.caching");
const constants_1 = require("../constants");
const api_1 = require("../../api");
let AuthGuard = class AuthGuard {
    constructor(jwtService, session, reflector) {
        this.jwtService = jwtService;
        this.session = session;
        this.reflector = reflector;
    }
    canActivate(context) {
        try {
            return this.canActivateAsync(context);
        }
        catch (error) {
            return false;
        }
    }
    async canActivateAsync(context) {
        var _a, _b;
        const publicEndpoint = (_a = this.reflector.getAllAndOverride(constants_1.PublicEndpointModifier, [context.getHandler()])) !== null && _a !== void 0 ? _a : false;
        const request = context.switchToHttp().getRequest();
        if (request.method === "OPTIONS") {
            return true;
        }
        if (publicEndpoint) {
            return true;
        }
        const auth = (_b = request.headers.authorization) === null || _b === void 0 ? void 0 : _b.substring("Bearer ".length);
        if (!auth) {
            throw this.authFailException();
        }
        const token = (await this.jwtService.verifyAsync(auth));
        if (!token) {
            throw this.authFailException();
        }
        const userSession = await this.session.tryGetAsync(token.id);
        if (!userSession) {
            throw this.authFailException();
        }
        return true;
    }
    authFailException() {
        return new common_1.HttpException({
            message: "noauth"
        }, api_1.ApiStatus.AuthFail);
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        session_caching_1.SessionCachingService,
        core_1.Reflector])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map