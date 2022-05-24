import { ArticleMetadataEntity, CategoryEntity } from "@/entities";

export * from "./inbound.dto"

interface DtoTemplate<E> {
    createFrom(entity: E)
}

function Dto<E>() {
    return <U extends DtoTemplate<E>>(constructor: U) => {constructor};
}

export class UserIdentity {
    name: string;
    id: string;
}

export class ArticlePageResult {
    count: number
    data: ArticleSummary[]
}

@Dto<ArticleMetadataEntity>()
export class ArticleSummary {
    id: string;
    title: string;
    category: string;
    date: number;
    visible: boolean;
    pinned: boolean;

    static createFrom(entity: ArticleMetadataEntity): ArticleSummary {
        return {
            id: entity.id.toString(),
            title: entity.title,
            category: entity.category.name,
            date: entity.date,
            visible: entity.visible,
            pinned: entity.pinned
        }
    }
}

@Dto<ArticleMetadataEntity>()
export class ArticleMetadata {
    id: string;
    title: string;
    desc: string;
    pinned: boolean;
    category: CategoryMetadata;
    time: number;

    static createFrom(entity: ArticleMetadataEntity): ArticleMetadata {
        return {
            id: entity.id.toString(),
            title: entity.title,
            desc: entity.desc,
            pinned: entity.pinned,
            category: CategoryMetadata.createFrom(entity.category),
            time: entity.date
        }
    }
}

@Dto<ArticleMetadataEntity>()
export class Article extends ArticleMetadata {
    content: string
    static createFrom(entity: ArticleMetadataEntity): Article {
        return {
            ...ArticleMetadata.createFrom(entity),
            content: entity.content.text
        }
    }
}

@Dto<CategoryEntity>()
export class CategoryMetadata {
    id: string;
    name: string;

    static createFrom(category: CategoryEntity): CategoryMetadata {
        return {
            id: category.id.toString(),
            name: category.name
        }
    }
}

@Dto<CategoryEntity>()
export class CategoryLevel {
    parent?: CategoryMetadata
    current: CategoryMetadata;
    children: CategoryMetadata[];

    static createFrom(category: CategoryEntity): CategoryLevel {
        return {
            parent: (
                !category.parent 
                    ? undefined 
                        : CategoryMetadata.createFrom(category.parent)
            ),
            current: CategoryMetadata.createFrom(category),
            children: category.children?.map(child => CategoryMetadata.createFrom(child)) ?? []
        }
    }
}

@Dto<CategoryEntity>()
export class Category extends CategoryMetadata {
    children?: Category[]

    static createFrom(category: CategoryEntity): Category {
        return {
            ...CategoryMetadata.createFrom(category),
            children: category.children?.map(child => CategoryMetadata.createFrom(child)) ?? []
        }
    }
}

export class SiteStatistics {
    articles: number;
    categories: number;
    pictures: number;
}

export class UserSession {
    id: number;
    name: string
}

export class HostedPicture {
    name: string;
    url: string
}