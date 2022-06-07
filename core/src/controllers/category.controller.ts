import { Public } from "@/common/decorator/auth.decorator";
import { CategoryUpdateParam } from "@/dtos";
import CategoryService from "@/services/category.service";
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { IsNumber } from "class-validator";

@Controller({
    version: "1",
})
export default class CategoryController {
    constructor (
        private categoryService: CategoryService
    ) { }

    @Public()
    @Get("category/:id")
    public async getCategoryLevel(
        @Param("id", ParseIntPipe) id: number
    ) {
        return await this.categoryService.getLevelById(id)
    }

    @Get("admin/category/:id")
    public async getCategories(
        @Param("id", ParseIntPipe) id: number
    ) {
        return await this.categoryService.getCategoryById(id)
    }

    @Post("admin/category/:id")
    public async updateCategory(
        @Param("id", ParseIntPipe) id: number,
        @Body() param: CategoryUpdateParam
    ) {
        return await this.categoryService.saveCategory(param, id)
    }

    @Put("admin/category/:id")
    public async putCategory(
        @Param("id", ParseIntPipe) id: number,
        @Body() param: CategoryUpdateParam
    ) {
        return await this.categoryService.saveCategory(param, undefined, id)
    }

    @Delete("admin/category/:id")
    public async deleteCategory(
        @Param("id", ParseIntPipe) id: number
    ) {
        return await this.categoryService.deleteCategory(id)
    }
}