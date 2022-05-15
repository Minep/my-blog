declare module "virtual:app-configer" {
    interface Configer {
        apiServer: string,
        adminEntry: string
    }
    export const appConfig: Configer
}