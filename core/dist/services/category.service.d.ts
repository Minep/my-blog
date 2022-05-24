import { Category, CategoryLevel, CategoryUpdateParam } from "@/dtos";
import { CategoryEntity } from "@/entities";
import { Repository } from "typeorm";
export default class CategoryService {
    private categoryRepo;
    constructor(categoryRepo: Repository<CategoryEntity>);
    getLevelById(cid: number): Promise<CategoryLevel>;
    getCategoryById(cid: number): Promise<Category>;
    saveCategory(updateParam: CategoryUpdateParam, cid?: number, parentId?: number): Promise<void>;
    deleteCategory(cid: number): Promise<void>;
}
