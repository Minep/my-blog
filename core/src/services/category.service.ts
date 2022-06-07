import { failed, notFound } from "@/api";
import { Category, CategoryLevel, CategoryMetadata, CategoryUpdateParam } from "@/dtos";
import { CategoryEntity } from "@/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";

@Injectable()
export default class CategoryService {
    constructor (
        @InjectRepository(CategoryEntity)
        private categoryRepo: Repository<CategoryEntity>
    ) {

    }

    public async getLevelById(cid: number): Promise<CategoryLevel> {
        if (cid === 0) {
            const roots = (await this.categoryRepo.find({
                where: {
                    parentId: IsNull()
                }
            })) ?? []

            return {
                current: {
                    id: "0",
                    name: "主目录"
                },
                children: roots.map(child => CategoryMetadata.createFrom(child))
            }
        }
        
        const category: CategoryEntity = await this.categoryRepo.findOne({
            where: {
                id: cid
            },
            relations: ["children", "parent"]
        })

        if (!category) {
            throw notFound(`get(cid=${cid})`)
        }

        return CategoryLevel.createFrom(category)
    }

    public async getCategoryById(cid: number): Promise<Category> {
        if (cid === 0) {
            const roots = (await this.categoryRepo.find({
                where: {
                    parentId: IsNull()
                }
            })) ?? []

            return {
                id: "0",
                name: "主目录",
                children: roots.map(child => CategoryMetadata.createFrom(child))
            }
        }

        const category: CategoryEntity = await this.categoryRepo.findOne({
            where: {
                id: cid
            },
            relations: ["children"]
        })

        if (!category) {
            throw notFound(`get(cid=${cid})`)
        }

        return Category.createFrom(category);
    }

    public async saveCategory(updateParam: CategoryUpdateParam, cid?: number, parentId?: number) {
        if (cid === 0) {
            throw failed("invalid(cid=0)")
        }
        const instance = this.categoryRepo.create({
            id: cid,
            name: updateParam.name,
            parent: {
                id: (parentId ?? updateParam.parent) || null
            }
        })

        await this.categoryRepo.save(instance)
    }

    public async deleteCategory(cid: number) {
        try {
            await this.categoryRepo.delete({
                id: cid
            })
        }
        catch {
            throw failed(`delete(cid=${cid})`)
        }
    }
}