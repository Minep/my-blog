"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiException = exports.ApiPermissionDenied = exports.notFound = exports.failed = exports.ApiStatus = void 0;
var ApiStatus;
(function (ApiStatus) {
    ApiStatus[ApiStatus["OK"] = 200] = "OK";
    ApiStatus[ApiStatus["OpFailure"] = 400] = "OpFailure";
    ApiStatus[ApiStatus["AuthFail"] = 403] = "AuthFail";
    ApiStatus[ApiStatus["NotFound"] = 404] = "NotFound";
    ApiStatus[ApiStatus["TooManyReqs"] = 429] = "TooManyReqs";
})(ApiStatus = exports.ApiStatus || (exports.ApiStatus = {}));
function failed(message, payload) {
    return ApiException(ApiStatus.OpFailure, message, payload);
}
exports.failed = failed;
function notFound(message, payload) {
    return ApiException(ApiStatus.NotFound, message, payload);
}
exports.notFound = notFound;
function ApiPermissionDenied(message, payload) {
    return ApiException(ApiStatus.AuthFail, message, payload);
}
exports.ApiPermissionDenied = ApiPermissionDenied;
function ApiException(status, message, payload) {
    return {
        status: status,
        msg: message !== null && message !== void 0 ? message : 'error',
        payload: payload
    };
}
exports.ApiException = ApiException;
//# sourceMappingURL=index.js.map