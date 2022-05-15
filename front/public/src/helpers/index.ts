export interface ArticleMetadata {
    id: string;
    title: string;
    desc: string;
    pinned: boolean;
    category: CategoryMetadata;
    time: number;
}

export interface Article extends ArticleMetadata {
    content: string
}

export interface CategoryMetadata {
    id: string;
    name: string;
}

export interface CategoryLevel {
    parent?: CategoryMetadata
    current: CategoryMetadata;
    children: CategoryMetadata[];
}

export interface UINotification {
    level: "success" | "info" | "warn" | "error"
    message: string,
    elapse?: number
}