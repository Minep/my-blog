import { notFound, failed } from "@/api";
import { Article, ArticleMetadata, ArticlePageResult, ArticleQueryFilter, ArticleSummary, ArticleUploadMetadata, CategoryMetadata } from "@/dtos";
import { ArticleEntity, ArticleMetadataEntity } from "@/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository, SelectQueryBuilder } from "typeorm";

@Injectable()
export default class ArticleService {
    constructor (
        @InjectRepository(ArticleMetadataEntity)
        private articleRepo: Repository<ArticleMetadataEntity>,
        @InjectRepository(ArticleEntity)
        private contentRepo: Repository<ArticleEntity>
    ) { }

    private fromQueryFilter(filter: ArticleQueryFilter) {
        return {
            skip: filter.offset,
            take: filter.limit ?? 20,
            where: (filter.cid ? filter.cid.map(v => ({
                categoryId: v == 0 ? IsNull() : v
            })) : {})
        }
    }

    public async list(filter: ArticleQueryFilter): Promise<ArticleMetadata[]> {
        const queryPart = this.fromQueryFilter(filter);
        const where_clause = 
            (queryPart.where instanceof Array) 
            ? queryPart.where.length > 0 
                ? queryPart.where[0] 
                    : {}
                : {}
        const articles = await this.articleRepo.find({
            select: [
                "title",
                "date",
                "pinned",
                "category",
                "desc",
                "id"
            ],
            ...queryPart,
            where: {
                ...where_clause,
                visible: true
            },
            relations: ["category"],
            order: {
                pinned: "DESC",
                date: "DESC"
            }
        })

        return articles.map<ArticleMetadata>(v => ArticleMetadata.createFrom(v))
    }

    public async listSummaryPagenated(filter: ArticleQueryFilter): Promise<ArticlePageResult> {
        const condition = this.fromQueryFilter(filter)
        
        const totalCount = await this.articleRepo.count({
            where: condition.where,
            cache: true
        })

        const articles = await this.articleRepo.find({
            select: [
                "id",
                "visible",
                "title",
                "date",
                "pinned",
                "category"
            ],
            ...condition,
            relations: ["category"]
        })

        return {
            count: totalCount,
            data: articles.map(v => ArticleSummary.createFrom(v))
        }
    }

    public async delete(aid: number) {
        try {
            await this.articleRepo.delete(aid)
        }
        catch(err) {
            console.error(err)
            throw notFound(`delete(aid=${aid})`)
        }
    }

    public async save(update: ArticleUploadMetadata, aid?: number) {
        try {
            await this.articleRepo.save(this.articleRepo.create({
                id: aid,
                title: update.title,
                date: update.time,
                pinned: update.pinned,
                visible: update.visible ?? true,
                desc: update.desc,
                category: (update.category == 0 ? undefined : {
                    id: update.category
                }),
                content: {
                    text: update.content
                }
            }))
        }
        catch (err) {
            console.error(err)
            throw failed(`save(aid=${aid})`)
        }
    }

    public async get(aid: number): Promise<Article> {
        const article = await this.articleRepo.findOne({
            where: {
                id: aid,
                visible: true
            },
            relations: [ "content", "category" ]
        })

        if (!article) {
            throw notFound(`get(aid=${aid})`)
        }

        return Article.createFrom(article)
    }
}