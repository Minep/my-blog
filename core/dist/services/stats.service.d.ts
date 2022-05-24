import { SiteStatistics } from "@/dtos";
import { ArticleMetadataEntity, CategoryEntity } from "@/entities";
import { Repository } from "typeorm";
export default class SiteStatisticsService {
    private categoryRepo;
    private articleRepo;
    constructor(categoryRepo: Repository<CategoryEntity>, articleRepo: Repository<ArticleMetadataEntity>);
    getAggregated(): Promise<SiteStatistics>;
}
