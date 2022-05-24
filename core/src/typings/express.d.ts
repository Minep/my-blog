import { UserSession } from "@/dtos"
import { Request } from "express"

declare module "express" {
    interface Request {
        user: UserSession
    }
}