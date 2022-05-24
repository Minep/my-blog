"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardedAddrCacheKey = exports.sessionCacheKey = void 0;
const sessionCacheKey = (id) => `session:${id}`;
exports.sessionCacheKey = sessionCacheKey;
const guardedAddrCacheKey = (addr) => `guarded:${addr}`;
exports.guardedAddrCacheKey = guardedAddrCacheKey;
//# sourceMappingURL=keys.constant.js.map