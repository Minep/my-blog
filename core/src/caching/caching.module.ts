import { Global, Module } from "@nestjs/common";
import { SessionCachingService } from "./services/session.caching";
import { AccessGuardCachingService } from "./services/access-guard.caching";

@Global()
@Module({
    providers: [
        SessionCachingService,
        AccessGuardCachingService
    ],
    exports: [
        SessionCachingService,
        AccessGuardCachingService
    ]
})
export class CachingModule { }