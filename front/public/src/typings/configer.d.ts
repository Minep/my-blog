declare module "virtual:app-configer" {
    interface Configer {
        apiServer: string,
        adminEntry: string,
        siteName: string
    }
    export const appConfig: Configer
}