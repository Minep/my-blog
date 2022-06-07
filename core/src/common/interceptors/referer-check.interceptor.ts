import { NestInterceptor, CallHandler, ExecutionContext, HttpException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { ApiStatus, failed } from "@/api";

export class RefererCheckInterceptor implements NestInterceptor {
    private frontEndUrl: string
    constructor (config: ConfigService) {
        this.frontEndUrl = config.get("sys.frontendUrl")
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest() as Request
        const referer = request.headers.referer ?? ""
        if (!referer.startsWith(this.frontEndUrl)) {
            throw new HttpException(failed("Unidentified request."), ApiStatus.AuthFail);
        }
        return next.handle()
    }
    
}