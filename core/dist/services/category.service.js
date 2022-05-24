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
let CategoryService = class CategoryService {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async getLevelById(cid) {
        var _a;
        if (cid === 0) {
            const roots = (_a = (await this.categoryRepo.find({
                where: {
                    parent: (0, typeorm_2.IsNull)()
                }
            }))) !== null && _a !== void 0 ? _a : [];
            return {
                current: {
                    id: "0",
                    name: "主目录"
                },
                children: roots.map(child => dtos_1.CategoryMetadata.createFrom(child))
            };
        }
        const category = await this.categoryRepo.findOne({
            where: {
                id: cid
            },
            relations: ["children", "parent"]
        });
        if (!category) {
            throw (0, api_1.notFound)(`get(cid=${cid})`);
        }
        return dtos_1.CategoryLevel.createFrom(category);
    }
    async getCategoryById(cid) {
        const category = await this.categoryRepo.findOne(cid, {
            where: {
                id: cid
            },
            relations: ["children"]
        });
        if (!category) {
            throw (0, api_1.notFound)(`get(cid=${cid})`);
        }
        return dtos_1.Category.createFrom(category);
    }
    async saveCategory(updateParam, cid, parentId) {
        if (cid === 0) {
            throw (0, api_1.failed)("invalid(cid=0)");
        }
        const instance = this.categoryRepo.create({
            id: cid,
            name: updateParam.name,
            parent: {
                id: (parentId !== null && parentId !== void 0 ? parentId : updateParam.parent) || null
            }
        });
        await this.categoryRepo.save(instance);
    }
    async deleteCategory(cid) {
        try {
            await this.categoryRepo.delete({
                id: cid
            });
        }
        catch (_a) {
            throw fail(`delete(cid=${cid})`);
        }
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
exports.default = CategoryService;
//# sourceMappingURL=category.service.js.map