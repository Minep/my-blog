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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const bcrypt = require("bcrypt");
const constants_1 = require("./constants");
const session_caching_1 = require("../caching/services/session.caching");
const config_1 = require("@nestjs/config");
const api_1 = require("../api");
let AuthService = class AuthService {
    constructor(userRepository, session, jwtService, config) {
        this.userRepository = userRepository;
        this.session = session;
        this.jwtService = jwtService;
        this.refreshTokenTTL = config.get("security.sessionExpiration");
        this.accessTokenTTL = config.get("security.accessTokenExpiration");
    }
    async doLogin(loginParam) {
        const user = await this.userRepository.findOne({
            where: {
                name: loginParam.name
            },
            select: ["id", "name", "password"]
        });
        if (!user) {
            throw (0, api_1.ApiPermissionDenied)("loginFailed");
        }
        if (!(await bcrypt.compare(loginParam.password, user.password))) {
            throw (0, api_1.ApiPermissionDenied)("loginFailed");
        }
        let userSession = await this.session.tryGetAsync(user.id);
        if (!userSession) {
            userSession = await this.session.setNewAsync(user);
        }
        return {
            pair: {
                accessToken: await this.issueJwtPair(userSession, constants_1.TokenType.ACCESS),
                refreshToken: await this.issueJwtPair(userSession, constants_1.TokenType.REFRESH),
            },
            identity: {
                id: user.id,
                name: user.name
            }
        };
    }
    async doLogout(session) {
        await this.session.invalidateAsync(session.id);
    }
    async doRefresh(session) {
        const user = await this.userRepository.findOne(session.id, {
            select: ["id", "name"]
        });
        return {
            pair: {
                accessToken: await this.issueJwtPair(session, constants_1.TokenType.ACCESS)
            },
            identity: {
                id: user.id,
                name: user.name
            }
        };
    }
    issueJwtPair(user, tokenType) {
        const token = {
            id: user.id,
            type: tokenType
        };
        const expire = (tokenType === constants_1.TokenType.ACCESS)
            ? this.accessTokenTTL
            : this.refreshTokenTTL;
        return this.jwtService.signAsync(token, {
            expiresIn: expire
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        session_caching_1.SessionCachingService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map