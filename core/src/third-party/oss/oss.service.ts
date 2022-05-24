import { Inject, Injectable } from "@nestjs/common";
import OSS from "ali-oss"
import { OSSFileMetadata, PostSignature } from "@3rd/oss/interfaces/oss.interface";
import { OSSClientOptions, OSS_CONFIG } from "./interfaces/oss-config.interface";
import * as Crypto from "crypto"
import { Callback, PostObjectCredential } from "./interfaces/oss.interface";
import { HostedPicture } from "@/dtos";

@Injectable()
export class OSSClientService {
    private ossClient: OSS

    constructor(
        @Inject(OSS_CONFIG)
        private _options: OSSClientOptions
    ){
        this.ossClient = new OSS({
            endpoint: _options.region,
            accessKeyId: _options.accessId,
            accessKeySecret: _options.accessKey,
            bucket: _options.bucket
        })
    }

    get options () {
        return this._options
    }

    /**
     * Create PostObject credential needed by client to upload files onto bucket
     * 
     * see [this oss documentation](https://help.aliyun.com/document_detail/31988.htm) for more details
     * @param files List of files which will be uploaded to bucket
     * @returns A key-valued object with file name and it's associated credential.
     */
    generatePostObjectCredentials (files: OSSFileMetadata[], callback?: Callback): PostObjectCredential {
        const credentials: Record<string, PostSignature> = {}
        const callbackStr = callback ? this.toCallbackString(callback) : undefined
        files.forEach(({ name, path, type, maxSize }) => {
            if (!type) {
                throw new Error("Must specify file type when construct credential for upload")
            }
            const policy = this.getUploadPolicy(`${path}/${name}`, type, maxSize, callbackStr)
            credentials[name] = this.calculatePostSignature(policy)
        });
        return {
            accessKeyId: this._options.accessId,
            credentials: credentials,
            callback: callbackStr
        }
    }

    /**
     * Delete multiple file from OSS bucket. 
     * @param files the full path of files in the bucket
     * @returns the files deleted
     */
    async deleteObjects (files: string[]) {
        return (await this.ossClient.deleteMulti(files)).deleted || []
    }

    async listObjects (prefix: string, lastEl?: string, limit?: number): Promise<HostedPicture[]> {
        // @ts-ignore
        const result: OSS.ListObjectResult = await this.ossClient.listV2({
            prefix: prefix,
            "max-keys": limit ?? 20,
            "start-after": lastEl
        })

        return result.objects.map<HostedPicture>(v => ({
            name: v.name,
            url: v.url
        }))
    }

    async deleteByPrefix (prefix: string) {
        const { objects } = await this.ossClient.list({
            prefix: prefix,
            "max-keys": 50
        }, { })
        if (!objects) {
            return []
        }
        const files = objects.map(v => v.name)
        return await this.deleteObjects(files)
    }

    private toCallbackString (callback: Callback) {
        const callbackBody = JSON.stringify(callback.callbackBody)
        return Buffer.from(
            JSON.stringify({
                ...callback,
                callbackBody: callbackBody,
                callbackBodyType: "application/json"
            }),
            "utf8"
        ).toString("base64")
    }

    private getUploadPolicy (filename: string, fileType: string, maxSize?: number, callback?: string) {
        const expire = new Date(Date.now() + (this._options.ossTokenExpire || 60) * 1000).toISOString()

        const policy = {
            expiration: expire,
            conditions: [
                { bucket: this._options.bucket },
                { "Content-Type": "image/jpeg"},
                ["eq", "$key", filename],
                ["content-length-range", 1, maxSize || 1024 * 1024 * 1024]
            ] as any[]
        }

        if (callback) {
            policy.conditions.push({ callback: callback })
        }

        return policy
    }

    private calculatePostSignature (policy: any): PostSignature {
        const policyStr = Buffer.from(JSON.stringify(policy), "utf8").toString("base64");
        const signature = 
            Crypto
                .createHmac("sha1", this._options.accessKey)
                .update(policyStr)
                .digest("base64");

        return {
            signature: signature,
            policy: policyStr
        }
    }

}