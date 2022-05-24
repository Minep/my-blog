import { Article, ArticleMetadata, ArticlePageResult, ArticleQueryFilter, ArticleUploadMetadata } from "@/dtos";
import { ArticleMetadataEntity } from "@/entities";
import { Repository } from "typeorm";
export default class ArticleService {
    private articleRepo;
    constructor(articleRepo: Repository<ArticleMetadataEntity>);
    private fromQueryFilter;
    list(filter: ArticleQueryFilter): Promise<ArticleMetadata[]>;
    listSummaryPagenated(filter: ArticleQueryFilter): Promise<ArticlePageResult>;
    delete(aid: number): Promise<void>;
    save(update: ArticleUploadMetadata, aid?: number): Promise<void>;
    get(aid: number): Promise<Article>;
}
