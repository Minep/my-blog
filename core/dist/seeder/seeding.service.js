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
let SeedingService = class SeedingService {
    constructor(categoryRepo, articleRepo, articleContentRepo) {
        this.categoryRepo = categoryRepo;
        this.articleRepo = articleRepo;
        this.articleContentRepo = articleContentRepo;
    }
    async seed() {
        await this.categoryRepo.createQueryBuilder().delete().execute();
        await this.articleRepo.createQueryBuilder().delete().execute();
        const root = this.categoryRepo.create({
            name: "root"
        });
        await this.categoryRepo.save(root);
        const ch1 = this.categoryRepo.create({
            name: "c1",
            parent: root
        });
        await this.categoryRepo.save(ch1);
        const ch2 = this.categoryRepo.create({
            name: "c2",
            parent: root
        });
        await this.categoryRepo.save(ch2);
        const ch3 = this.categoryRepo.create({
            name: "c3",
            parent: root
        });
        await this.categoryRepo.save(ch3);
        const ch11 = this.categoryRepo.create({
            name: "c11",
            parent: ch1
        });
        await this.categoryRepo.save(ch11);
        const ch12 = this.categoryRepo.create({
            name: "c12",
            parent: ch1
        });
        await this.categoryRepo.save(ch12);
        const contents = [
            this.articleContentRepo.create({
                text: "This is content"
            }),
            this.articleContentRepo.create({
                text: "This is content2"
            }),
            this.articleContentRepo.create({
                text: "This is content3"
            }),
        ];
        await this.articleContentRepo.save(contents[0]);
        await this.articleContentRepo.save(contents[1]);
        await this.articleContentRepo.save(contents[2]);
        const metadata = this.articleRepo.create({
            title: "Test Article",
            desc: "This is test article",
            pinned: true,
            date: 1234567890,
            category: ch12,
            visible: true,
            content: contents[0]
        });
        const metadata2 = this.articleRepo.create({
            title: "Test Article2",
            desc: "This is test article2",
            pinned: true,
            date: 3234567890,
            category: ch11,
            visible: true,
            content: contents[1]
        });
        const metadata3 = this.articleRepo.create({
            title: "Test Article3",
            desc: "This is test article3",
            pinned: false,
            date: 126789,
            category: ch1,
            visible: false,
            content: contents[2]
        });
        await this.articleRepo.save(metadata);
        await this.articleRepo.save(metadata2);
        await this.articleRepo.save(metadata3);
    }
};
SeedingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.CategoryEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.ArticleMetadataEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.ArticleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeedingService);
exports.default = SeedingService;
//# sourceMappingURL=seeding.service.js.map