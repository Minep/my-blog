import { ArticleMetadataEntity } from "./article.entity";
export declare class CategoryEntity {
    id: number;
    name: string;
    parent: CategoryEntity;
    children: CategoryEntity[];
    articles: ArticleMetadataEntity[];
}
