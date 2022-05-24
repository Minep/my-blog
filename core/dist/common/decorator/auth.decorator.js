"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshEndpoint = exports.Public = exports.Protected = void 0;
const constants_1 = require("../../auth/constants");
const refresh_guard_1 = require("../../auth/guards/refresh.guard");
const common_1 = require("@nestjs/common");
const Protected = () => (0, common_1.SetMetadata)(constants_1.PublicEndpointModifier, false);
exports.Protected = Protected;
const Public = () => (0, common_1.SetMetadata)(constants_1.PublicEndpointModifier, true);
exports.Public = Public;
const RefreshEndpoint = () => (0, common_1.UseGuards)(refresh_guard_1.RefreshTokenGuard);
exports.RefreshEndpoint = RefreshEndpoint;
//# sourceMappingURL=auth.decorator.js.map