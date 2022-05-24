import { TokenType } from "../constants";
export interface UserToken {
    id: number;
    type: TokenType;
    exp?: number;
}
export interface TokenPair {
    accessToken: string;
    refreshToken?: string;
}
