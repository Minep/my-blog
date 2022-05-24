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
const auth_decorator_1 = require("../common/decorator/auth.decorator");
const dtos_1 = require("../dtos");
const article_service_1 = require("../services/article.service");
const common_1 = require("@nestjs/common");
let ArticleController = class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    async listArticlePublic(filter) {
        return this.articleService.list(filter);
    }
    async getArticleContent(id) {
        return this.articleService.get(id);
    }
    async publishArticle(article) {
        this.articleService.save(article);
    }
    async updateArticle(id, article) {
        this.articleService.save(article, id);
    }
    async deleteArticle(id) {
        this.articleService.delete(id);
    }
    async listArticleSummary(filter) {
        return this.articleService.listSummaryPagenated(filter);
    }
};
__decorate([
    (0, common_1.Get)("articles"),
    (0, auth_decorator_1.Public)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.ArticleQueryFilter]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "listArticlePublic", null);
__decorate([
    (0, common_1.Get)("articles/:id"),
    (0, auth_decorator_1.Public)(),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getArticleContent", null);
__decorate([
    (0, common_1.Put)("admin/articles/"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.ArticleUploadMetadata]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "publishArticle", null);
__decorate([
    (0, common_1.Post)("admin/articles/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.ArticleUploadMetadata]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "updateArticle", null);
__decorate([
    (0, common_1.Delete)("admin/articles/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "deleteArticle", null);
__decorate([
    (0, common_1.Get)("admin/articles"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.ArticleQueryFilter]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "listArticleSummary", null);
ArticleController = __decorate([
    (0, common_1.Controller)({
        version: "1"
    }),
    __metadata("design:paramtypes", [article_service_1.default])
], ArticleController);
exports.default = ArticleController;
//# sourceMappingURL=article.controller.js.map