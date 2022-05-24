/**
 * File metadata for generating the OSS access credential
 */
export interface OSSFileMetadata {
    /**
     * Name of the file
     */
    name: string
    /**
     * Path of the file should be stored in OSS
     */
    path: string
    /**
     * Type of file, using MIME-Types as in Content-Type header
     */
    type?: string
    /**
     * Max size of file in bytes (default is 1MiB)
     */
    maxSize?: number
}

export interface PostSignature {
    signature: string,
    policy: string
}

export interface Callback {
    callbackUrl: string
    callbackBody: any
    callbackHost?: string
}

export interface PostObjectCredential {
    accessKeyId: string
    credentials: Record<string, PostSignature>
    callback?: string
}