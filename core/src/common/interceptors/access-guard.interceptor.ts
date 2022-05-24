import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, throwError } from "rxjs";
import { AccessGuardCachingService } from "src/caching/services/access-guard.caching";
import { ApiException, ApiStatus } from "@/api";
import { Request } from "express";

@Injectable()
export class AccessGuardInterceptor implements NestInterceptor {
    constructor (
        private guard: AccessGuardCachingService
    ) {

    }

    async intercept(
        context: ExecutionContext, 
        next: CallHandler<any>
    ): Promise<Observable<any>> {
        const ipAddr: string = context.switchToHttp().getRequest<Request>().ip
        const isBanned = await this.guard.isBanned(ipAddr)
        if (isBanned) {
            throw ApiException(ApiStatus.TooManyReqs, "banned")
        }
        return next.handle().pipe(
            catchError((err) => {
                this.guard.recordThis(ipAddr)
                return throwError(() => err)
            })
        )
    }
}