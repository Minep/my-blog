import { ApiResult, ApiStatus } from "@/api";
import { NestInterceptor, Injectable, CallHandler, ExecutionContext, HttpException } from "@nestjs/common";
import { map, Observable, catchError, throwError } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    async intercept(
        context: ExecutionContext, 
        next: CallHandler<any>
    ): Promise<Observable<any>> {
        return next.handle().pipe(
            map(data => ({
                message: "ok",
                payload: data
            } as ApiResult)),
            catchError((err: any) => {
                if (typeof err === 'string') {
                    return throwError(() => new HttpException({
                        message: err
                    } as ApiResult, ApiStatus.OpFailure))
                }
                else if (err.status) {
                    return throwError(() => new HttpException({
                        message: err.msg,
                        payload: err.payload
                    } as ApiResult, err.status))
                }
                return throwError(() => err)
            })
        )
    }
}