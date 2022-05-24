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
var CategoryEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const article_entity_1 = require("./article.entity");
let CategoryEntity = CategoryEntity_1 = class CategoryEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 80
    }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CategoryEntity_1, (v) => v.children, {
        onDelete: "SET NULL"
    }),
    __metadata("design:type", CategoryEntity)
], CategoryEntity.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CategoryEntity_1, (v) => v.parent),
    __metadata("design:type", Array)
], CategoryEntity.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => article_entity_1.ArticleMetadataEntity, (articles) => articles.category),
    __metadata("design:type", Array)
], CategoryEntity.prototype, "articles", void 0);
CategoryEntity = CategoryEntity_1 = __decorate([
    (0, typeorm_1.Entity)({
        name: "category"
    })
], CategoryEntity);
exports.CategoryEntity = CategoryEntity;
//# sourceMappingURL=category.entity.js.map