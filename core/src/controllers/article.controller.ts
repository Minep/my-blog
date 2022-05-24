import { Public } from "@/common/decorator/auth.decorator";
import { ArticleQueryFilter, ArticleUploadMetadata } from "@/dtos";
import ArticleService from "@/services/article.service";
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";

@Controller({
    version: "1"
})
export default class ArticleController {
    constructor (
        private articleService: ArticleService
    ) { }

    @Get("articles")
    @Public()
    public async listArticlePublic (
        @Query() filter: ArticleQueryFilter
    ) {
        return this.articleService.list(filter)
    }

    @Get("articles/:id")
    @Public()
    public async getArticleContent (
        @Param("id", ParseIntPipe) id: number
    ) {
        return this.articleService.get(id)
    }

    @Put("admin/articles/")
    public async publishArticle (
        @Body() article: ArticleUploadMetadata
    ) {
        this.articleService.save(article)
    }

    @Post("admin/articles/:id")
    public async updateArticle (
        @Param("id", ParseIntPipe) id: number,
        @Body() article: ArticleUploadMetadata
    ) {
        this.articleService.save(article, id)
    }

    @Delete("admin/articles/:id")
    public async deleteArticle (
        @Param("id", ParseIntPipe) id: number
    ) {
        this.articleService.delete(id)
    }

    @Get("admin/articles")
    public async listArticleSummary (
        @Query() filter: ArticleQueryFilter
    ) {
        return this.articleService.listSummaryPagenated(filter)
    }
}