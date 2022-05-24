import { ArticleMetadataEntity, CategoryEntity } from "@/entities";
export * from "./inbound.dto";
export declare class UserIdentity {
    name: string;
    id: string;
}
export declare class ArticlePageResult {
    count: number;
    data: ArticleSummary[];
}
export declare class ArticleSummary {
    id: string;
    title: string;
    category: string;
    date: number;
    visible: boolean;
    pinned: boolean;
    static createFrom(entity: ArticleMetadataEntity): ArticleSummary;
}
export declare class ArticleMetadata {
    id: string;
    title: string;
    desc: string;
    pinned: boolean;
    category: CategoryMetadata;
    time: number;
    static createFrom(entity: ArticleMetadataEntity): ArticleMetadata;
}
export declare class Article extends ArticleMetadata {
    content: string;
    static createFrom(entity: ArticleMetadataEntity): Article;
}
export declare class CategoryMetadata {
    id: string;
    name: string;
    static createFrom(category: CategoryEntity): CategoryMetadata;
}
export declare class CategoryLevel {
    parent?: CategoryMetadata;
    current: CategoryMetadata;
    children: CategoryMetadata[];
    static createFrom(category: CategoryEntity): CategoryLevel;
}
export declare class Category extends CategoryMetadata {
    children?: Category[];
    static createFrom(category: CategoryEntity): Category;
}
export declare class SiteStatistics {
    articles: number;
    categories: number;
    pictures: number;
}
export declare class UserSession {
    id: number;
    name: string;
}
export declare class HostedPicture {
    name: string;
    url: string;
}
