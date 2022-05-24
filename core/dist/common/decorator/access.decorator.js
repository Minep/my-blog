"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitedAttempts = void 0;
const common_1 = require("@nestjs/common");
const access_guard_interceptor_1 = require("../interceptors/access-guard.interceptor");
const LimitedAttempts = () => (0, common_1.UseInterceptors)(access_guard_interceptor_1.AccessGuardInterceptor);
exports.LimitedAttempts = LimitedAttempts;
//# sourceMappingURL=access.decorator.js.map