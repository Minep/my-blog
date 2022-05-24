import { ArticleEntity, ArticleMetadataEntity, CategoryEntity } from "@/entities";
import { Repository } from "typeorm";
export default class SeedingService {
    private categoryRepo;
    private articleRepo;
    private articleContentRepo;
    constructor(categoryRepo: Repository<CategoryEntity>, articleRepo: Repository<ArticleMetadataEntity>, articleContentRepo: Repository<ArticleEntity>);
    seed(): Promise<void>;
}
