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
const api_1 = require("../api");
const dtos_1 = require("../dtos");
const entities_1 = require("../entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ArticleService = class ArticleService {
    constructor(articleRepo) {
        this.articleRepo = articleRepo;
    }
    fromQueryFilter(filter) {
        var _a;
        return {
            skip: filter.offset,
            take: (_a = filter.limit) !== null && _a !== void 0 ? _a : 20,
            where: (filter.cid ? filter.cid.map(v => ({
                category: {
                    id: v
                }
            })) : undefined)
        };
    }
    async list(filter) {
        const queryPart = this.fromQueryFilter(filter);
        const articles = await this.articleRepo.find(Object.assign(Object.assign({ select: [
                "title",
                "date",
                "pinned",
                "category",
                "desc",
                "id"
            ] }, queryPart), { where: {
                category: {
                    id: filter.cid ? filter.cid[0] : undefined
                },
                visible: true
            }, relations: ["category"], order: {
                pinned: "DESC",
                date: "DESC"
            } }));
        return articles.map(v => dtos_1.ArticleMetadata.createFrom(v));
    }
    async listSummaryPagenated(filter) {
        const condition = this.fromQueryFilter(filter);
        const totalCount = await this.articleRepo.count({
            where: condition.where,
            cache: true
        });
        const articles = await this.articleRepo.find(Object.assign(Object.assign({ select: [
                "id",
                "visible",
                "title",
                "date",
                "pinned",
                "category"
            ] }, condition), { relations: ["category"] }));
        return {
            count: totalCount,
            data: articles.map(v => dtos_1.ArticleSummary.createFrom(v))
        };
    }
    async delete(aid) {
        try {
            await this.articleRepo.delete(aid);
        }
        catch (err) {
            console.error(err);
            throw (0, api_1.notFound)(`delete(aid=${aid})`);
        }
    }
    async save(update, aid) {
        var _a;
        try {
            this.articleRepo.save(this.articleRepo.create({
                id: aid,
                title: update.title,
                date: update.time,
                pinned: update.pinned,
                visible: (_a = update.visible) !== null && _a !== void 0 ? _a : true,
                desc: update.desc,
                category: {
                    id: update.category
                },
                content: {
                    text: update.content
                }
            }));
        }
        catch (err) {
            console.error(err);
            throw fail(`save(aid=${aid})`);
        }
    }
    async get(aid) {
        const article = await this.articleRepo.findOne(aid, {
            where: {
                visible: true
            },
            relations: ["content", "category"]
        });
        if (!article) {
            throw (0, api_1.notFound)(`get(aid=${aid})`);
        }
        return dtos_1.Article.createFrom(article);
    }
};
ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ArticleMetadataEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArticleService);
exports.default = ArticleService;
//# sourceMappingURL=article.service.js.map