"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicEndpointModifier = exports.refreshCookieName = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["REFRESH"] = 0] = "REFRESH";
    TokenType[TokenType["ACCESS"] = 1] = "ACCESS";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
exports.refreshCookieName = "__REFRESH";
exports.PublicEndpointModifier = Symbol("PROTECTED");
//# sourceMappingURL=index.js.map