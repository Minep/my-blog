import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";


export const Cookies = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return data ? request.cookies?.[data] : request.cookies;
    },
);

export const Session = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        return request.user
    }
)

export const RequestUrl = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        return request.url
    }
)