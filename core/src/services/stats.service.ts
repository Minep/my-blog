import { SiteStatistics } from "@/dtos";
import { ArticleMetadataEntity, CategoryEntity } from "@/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export default class SiteStatisticsService {
    constructor (
        @InjectRepository(CategoryEntity)
        private categoryRepo: Repository<CategoryEntity>,
        @InjectRepository(ArticleMetadataEntity)
        private articleRepo: Repository<ArticleMetadataEntity>
    ) { }

    public async getAggregated (): Promise<SiteStatistics> {
        const articleNo = await this.articleRepo.count({ cache: true })
        const categoryNo = await this.categoryRepo.count({ cache: true })

        return {
            articles: articleNo,
            categories: categoryNo,
            pictures: 0
        }
    }
}