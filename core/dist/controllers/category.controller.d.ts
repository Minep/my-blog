import { CategoryUpdateParam } from "@/dtos";
import CategoryService from "@/services/category.service";
export default class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    getCategoryLevel(id: number): Promise<import("@/dtos").CategoryLevel>;
    getCategories(id: number): Promise<import("@/dtos").Category>;
    updateCategory(id: number, param: CategoryUpdateParam): Promise<void>;
    putCategory(id: number, param: CategoryUpdateParam): Promise<void>;
    deleteCategory(id: number): Promise<void>;
}
