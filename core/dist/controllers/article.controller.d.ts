import { ArticleQueryFilter, ArticleUploadMetadata } from "@/dtos";
import ArticleService from "@/services/article.service";
export default class ArticleController {
    private articleService;
    constructor(articleService: ArticleService);
    listArticlePublic(filter: ArticleQueryFilter): Promise<import("@/dtos").ArticleMetadata[]>;
    getArticleContent(id: number): Promise<import("@/dtos").Article>;
    publishArticle(article: ArticleUploadMetadata): Promise<void>;
    updateArticle(id: number, article: ArticleUploadMetadata): Promise<void>;
    deleteArticle(id: number): Promise<void>;
    listArticleSummary(filter: ArticleQueryFilter): Promise<import("@/dtos").ArticlePageResult>;
}
