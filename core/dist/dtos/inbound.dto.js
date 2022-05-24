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
exports.ArticleQueryFilter = exports.ArticleUploadMetadata = exports.UserLoginParam = exports.CategoryUpdateParam = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CategoryUpdateParam {
}
__decorate([
    (0, class_validator_1.Length)(1, 80),
    __metadata("design:type", String)
], CategoryUpdateParam.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)((params) => parseInt(params.value)),
    __metadata("design:type", Number)
], CategoryUpdateParam.prototype, "parent", void 0);
exports.CategoryUpdateParam = CategoryUpdateParam;
class UserLoginParam {
}
__decorate([
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], UserLoginParam.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.Length)(1, 25),
    __metadata("design:type", String)
], UserLoginParam.prototype, "password", void 0);
exports.UserLoginParam = UserLoginParam;
class ArticleUploadMetadata {
}
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Transform)((params) => parseInt(params.value)),
    __metadata("design:type", Number)
], ArticleUploadMetadata.prototype, "category", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ArticleUploadMetadata.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.Length)(1, 150),
    __metadata("design:type", String)
], ArticleUploadMetadata.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.Length)(1, 500),
    __metadata("design:type", String)
], ArticleUploadMetadata.prototype, "desc", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], ArticleUploadMetadata.prototype, "pinned", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], ArticleUploadMetadata.prototype, "visible", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ArticleUploadMetadata.prototype, "time", void 0);
exports.ArticleUploadMetadata = ArticleUploadMetadata;
class ArticleQueryFilter {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)((params) => parseInt(params.value)),
    __metadata("design:type", Number)
], ArticleQueryFilter.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)((params) => parseInt(params.value)),
    __metadata("design:type", Number)
], ArticleQueryFilter.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, {
        each: true
    }),
    (0, class_transformer_1.Transform)((params) => {
        return params.value.split(',').map(v => parseInt(v));
    }),
    __metadata("design:type", Array)
], ArticleQueryFilter.prototype, "cid", void 0);
exports.ArticleQueryFilter = ArticleQueryFilter;
//# sourceMappingURL=inbound.dto.js.map