export enum TokenType {
    REFRESH = 0,
    ACCESS = 1
}

export const refreshCookieName = "__REFRESH"

export const PublicEndpointModifier = Symbol("PROTECTED")