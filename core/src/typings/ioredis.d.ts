import Redis from "ioredis";

declare module "ioredis" {
    interface Redis {
        call: ((...args: string[]) => Promise<any>)
    }    
}