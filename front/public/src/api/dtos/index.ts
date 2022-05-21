import type { ArticleMetadata, CategoryMetadata } from "@/helpers";

export interface CategoryUpdateParam extends Omit<CategoryMetadata, "id"> {

}

export interface UserIdentity {
    name: string;
    id: string;
}

export interface ArticlePageResult {
    count: number
    data: ArticleSummary[]
}

export interface ArticleSummary {
    id: string,
    title: string,
    category: string,
    date: number,
    visible: boolean
}

export interface ArticleUploadMetadata extends Omit<ArticleMetadata, "id" | "category"> {
    category: string,
    content: string
}

export interface Category extends CategoryMetadata {
    children?: Category[]
}

export interface SiteStatistics {
    articles: number,
    categories: number,
    pictures: number
}