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
exports.OSSClientService = void 0;
const common_1 = require("@nestjs/common");
const ali_oss_1 = require("ali-oss");
const oss_config_interface_1 = require("./interfaces/oss-config.interface");
const Crypto = require("crypto");
let OSSClientService = class OSSClientService {
    constructor(_options) {
        this._options = _options;
        this.ossClient = new ali_oss_1.default({
            endpoint: _options.region,
            accessKeyId: _options.accessId,
            accessKeySecret: _options.accessKey,
            bucket: _options.bucket
        });
    }
    get options() {
        return this._options;
    }
    generatePostObjectCredentials(files, callback) {
        const credentials = {};
        const callbackStr = callback ? this.toCallbackString(callback) : undefined;
        files.forEach(({ name, path, type, maxSize }) => {
            if (!type) {
                throw new Error("Must specify file type when construct credential for upload");
            }
            const policy = this.getUploadPolicy(`${path}/${name}`, type, maxSize, callbackStr);
            credentials[name] = this.calculatePostSignature(policy);
        });
        return {
            accessKeyId: this._options.accessId,
            credentials: credentials,
            callback: callbackStr
        };
    }
    async deleteObjects(files) {
        return (await this.ossClient.deleteMulti(files)).deleted || [];
    }
    async listObjects(prefix, lastEl, limit) {
        const result = await this.ossClient.listV2({
            prefix: prefix,
            "max-keys": limit !== null && limit !== void 0 ? limit : 20,
            "start-after": lastEl
        });
        return result.objects.map(v => ({
            name: v.name,
            url: v.url
        }));
    }
    async deleteByPrefix(prefix) {
        const { objects } = await this.ossClient.list({
            prefix: prefix,
            "max-keys": 50
        }, {});
        if (!objects) {
            return [];
        }
        const files = objects.map(v => v.name);
        return await this.deleteObjects(files);
    }
    toCallbackString(callback) {
        const callbackBody = JSON.stringify(callback.callbackBody);
        return Buffer.from(JSON.stringify(Object.assign(Object.assign({}, callback), { callbackBody: callbackBody, callbackBodyType: "application/json" })), "utf8").toString("base64");
    }
    getUploadPolicy(filename, fileType, maxSize, callback) {
        const expire = new Date(Date.now() + (this._options.ossTokenExpire || 60) * 1000).toISOString();
        const policy = {
            expiration: expire,
            conditions: [
                { bucket: this._options.bucket },
                { "Content-Type": "image/jpeg" },
                ["eq", "$key", filename],
                ["content-length-range", 1, maxSize || 1024 * 1024 * 1024]
            ]
        };
        if (callback) {
            policy.conditions.push({ callback: callback });
        }
        return policy;
    }
    calculatePostSignature(policy) {
        const policyStr = Buffer.from(JSON.stringify(policy), "utf8").toString("base64");
        const signature = Crypto
            .createHmac("sha1", this._options.accessKey)
            .update(policyStr)
            .digest("base64");
        return {
            signature: signature,
            policy: policyStr
        };
    }
};
OSSClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(oss_config_interface_1.OSS_CONFIG)),
    __metadata("design:paramtypes", [Object])
], OSSClientService);
exports.OSSClientService = OSSClientService;
//# sourceMappingURL=oss.service.js.map