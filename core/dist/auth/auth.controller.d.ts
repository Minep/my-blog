import { AuthService } from "./auth.service";
import { Response as ServerResponse } from "express";
import { UserLoginParam, UserSession } from "@/dtos";
export declare class AuthController {
    private service;
    private cookieOptions;
    constructor(service: AuthService);
    loginUser(loginParam: UserLoginParam, response: ServerResponse): Promise<{
        access: string;
        holder: UserSession;
    }>;
    refreshUser(session: UserSession): Promise<{
        access: string;
        holder: UserSession;
    }>;
    logout(session: UserSession, response: ServerResponse): Promise<ServerResponse<any, Record<string, any>>>;
}
