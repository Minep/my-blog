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
const category_service_1 = require("../services/category.service");
const common_1 = require("@nestjs/common");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async getCategoryLevel(id) {
        return await this.categoryService.getLevelById(id);
    }
    async getCategories(id) {
        return await this.categoryService.getCategoryById(id);
    }
    async updateCategory(id, param) {
        return await this.categoryService.saveCategory(param, id);
    }
    async putCategory(id, param) {
        return await this.categoryService.saveCategory(param, undefined, id);
    }
    async deleteCategory(id) {
        return await this.categoryService.deleteCategory(id);
    }
};
__decorate([
    (0, auth_decorator_1.Public)(),
    (0, common_1.Get)("category/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategoryLevel", null);
__decorate([
    (0, common_1.Get)("admin/category/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)("admin/category/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.CategoryUpdateParam]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Put)("admin/category/:id"),
    (0, auth_decorator_1.Public)(),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.CategoryUpdateParam]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "putCategory", null);
__decorate([
    (0, common_1.Delete)("admin/category/:id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
CategoryController = __decorate([
    (0, common_1.Controller)({
        version: "1",
    }),
    __metadata("design:paramtypes", [category_service_1.default])
], CategoryController);
exports.default = CategoryController;
//# sourceMappingURL=category.controller.js.map