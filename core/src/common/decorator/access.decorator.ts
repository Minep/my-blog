import { UseInterceptors } from "@nestjs/common"
import { AccessGuardInterceptor } from "../interceptors/access-guard.interceptor";

export const LimitedAttempts = () => UseInterceptors(AccessGuardInterceptor)