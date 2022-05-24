import { CategoryEntity } from "./category.entity";
import { UserEntity } from "./user.entity";
export declare class ArticleEntity {
    id: number;
    text: string;
}
export declare class ArticleMetadataEntity {
    id: number;
    title: string;
    category: CategoryEntity;
    desc: string;
    date: number;
    pinned: boolean;
    visible: boolean;
    author: UserEntity;
    content: ArticleEntity;
}
