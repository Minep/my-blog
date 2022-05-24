import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccessGuardCachingService } from "src/caching/services/access-guard.caching";
export declare class AccessGuardInterceptor implements NestInterceptor {
    private guard;
    constructor(guard: AccessGuardCachingService);
    intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>>;
}
