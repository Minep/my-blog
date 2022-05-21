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

export function mulberry32(a: number) {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export type ItemLoadingResolver<T> = (offset: number, limit: number) => Promise<T | undefined>
