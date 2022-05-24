export declare class CategoryUpdateParam {
    name: string;
    parent?: number;
}
export declare class UserLoginParam {
    name: string;
    password: string;
}
export declare class ArticleUploadMetadata {
    category: number;
    content: string;
    title: string;
    desc: string;
    pinned: boolean;
    visible?: boolean;
    time: number;
}
export declare class ArticleQueryFilter {
    offset: number;
    limit?: number;
    cid?: number[];
}
