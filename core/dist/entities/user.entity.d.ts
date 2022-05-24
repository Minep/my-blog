import { ArticleMetadataEntity } from "./article.entity";
export declare class UserEntity {
    id: number;
    name: string;
    password: string;
    articles: ArticleMetadataEntity[];
}
