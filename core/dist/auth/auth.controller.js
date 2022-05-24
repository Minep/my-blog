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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const access_decorator_1 = require("../common/decorator/access.decorator");
const auth_decorator_1 = require("../common/decorator/auth.decorator");
const dtos_1 = require("../dtos");
const constants_1 = require("./constants");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
        this.cookieOptions = {
            httpOnly: true,
            path: "/v1/refresh",
            sameSite: "lax",
            secure: true
        };
    }
    async loginUser(loginParam, response) {
        const { pair, identity } = await this.service.doLogin(loginParam);
        if (pair.refreshToken) {
            response.cookie(constants_1.refreshCookieName, pair.refreshToken, this.cookieOptions);
        }
        return {
            access: pair.accessToken,
            holder: identity
        };
    }
    async refreshUser(session) {
        const { pair, identity } = await this.service.doRefresh(session);
        return {
            access: pair.accessToken,
            holder: identity
        };
    }
    async logout(session, response) {
        await this.service.doLogout(session);
        response.clearCookie(constants_1.refreshCookieName, this.cookieOptions);
        return response.send();
    }
};
__decorate([
    (0, common_1.Post)("login"),
    (0, auth_decorator_1.Public)(),
    (0, access_decorator_1.LimitedAttempts)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserLoginParam, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Post)("refresh"),
    (0, auth_decorator_1.RefreshEndpoint)(),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserSession]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshUser", null);
__decorate([
    (0, common_1.Post)("logout"),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.UserSession, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    (0, common_1.Controller)({
        version: "1"
    }),
    (0, auth_decorator_1.Protected)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map