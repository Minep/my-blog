import { OSSFileMetadata } from "@3rd/oss/interfaces/oss.interface";
import { OSSClientOptions } from "./interfaces/oss-config.interface";
import { Callback, PostObjectCredential } from "./interfaces/oss.interface";
import { HostedPicture } from "@/dtos";
export declare class OSSClientService {
    private _options;
    private ossClient;
    constructor(_options: OSSClientOptions);
    get options(): OSSClientOptions;
    generatePostObjectCredentials(files: OSSFileMetadata[], callback?: Callback): PostObjectCredential;
    deleteObjects(files: string[]): Promise<any>;
    listObjects(prefix: string, lastEl?: string, limit?: number): Promise<HostedPicture[]>;
    deleteByPrefix(prefix: string): Promise<any>;
    private toCallbackString;
    private getUploadPolicy;
    private calculatePostSignature;
}
