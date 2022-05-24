export interface OSSFileMetadata {
    name: string;
    path: string;
    type?: string;
    maxSize?: number;
}
export interface PostSignature {
    signature: string;
    policy: string;
}
export interface Callback {
    callbackUrl: string;
    callbackBody: any;
    callbackHost?: string;
}
export interface PostObjectCredential {
    accessKeyId: string;
    credentials: Record<string, PostSignature>;
    callback?: string;
}
