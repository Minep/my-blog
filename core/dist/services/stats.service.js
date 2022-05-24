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
const entities_1 = require("../entities");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let SiteStatisticsService = class SiteStatisticsService {
    constructor(categoryRepo, articleRepo) {
        this.categoryRepo = categoryRepo;
        this.articleRepo = articleRepo;
    }
    async getAggregated() {
        const articleNo = await this.articleRepo.count({ cache: true });
        const categoryNo = await this.categoryRepo.count({ cache: true });
        return {
            articles: articleNo,
            categories: categoryNo,
            pictures: 0
        };
    }
};
SiteStatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.CategoryEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.ArticleMetadataEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SiteStatisticsService);
exports.default = SiteStatisticsService;
//# sourceMappingURL=stats.service.js.map