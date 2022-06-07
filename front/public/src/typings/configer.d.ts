declare module "virtual:app-configer" {
    interface Configer {
        apiServer: string,
        adminEntry: string,
        siteName: string,
        ossServer: string
    }
    export const appConfig: Configer
}