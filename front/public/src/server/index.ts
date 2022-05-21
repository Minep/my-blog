import type { ArticlePageResult, Category, UserIdentity } from "@/api/dtos";
import type { ApiResponse } from "@/api/response";
import type { Article, ArticleMetadata, CategoryLevel } from "@/helpers";
import { uniqueId } from "lodash";
import { createServer, Response } from "miragejs";
import { appConfig } from "virtual:app-configer";
import { articleMarkdown } from "./mock-data";

function createResponse<T>(status: number, message: string, data?: T) {
    return new Response(status, undefined, {
        message: message,
        payload: data
    } as ApiResponse<T>)
}

export function makeServer() {
    return createServer({
        routes() {
            this.urlPrefix = appConfig.apiServer;
            this.namespace = "v1"
            this.timing = 1000

            this.get("/articles/:aid", (_, request) => {
                return createResponse<Article>(200, "ok", {
                    id: request.params.aid,
                    title: "On Computable Numbers, with an Application to the Entscheidungsproblem",
                    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque neque animi, quia pariatur nostrum ea ex quo asperiores soluta, quas hic voluptatem repellendus dolorem magni, illo eligendi impedit maiores atque.",
                    pinned: true,
                    category: {
                        id: "233",
                        name: "分类一"
                    },
                    time: 1234567890,
                    content: articleMarkdown
                })
            })

            this.post("login", (_, req) => {
                return createResponse<UserIdentity>(200, 'ok', {
                    name: "lunaixsky",
                    id: "0"
                })
            })

            this.put("/admin/articles", (_, req) => {
                return createResponse(200, 'ok')
            })

            this.get("/admin/stats", (_, req) => {
                return createResponse(200, 'ok', {
                    articles: Math.floor(Math.random() * 400),
                    categories: Math.floor(Math.random() * 400),
                    pictures: Math.floor(Math.random() * 400)
                })
            })

            this.get("/articles", (_, req) => {
                const result = []
                for (let index = 0; index < 5; index++) {
                    result.push({
                        id: Math.floor(Math.random() * 1000).toString(),
                        title: 'Lorem ipsum dolor sit amet',
                        desc: 'Aliquam et leo elementum, vehicula ante a, fringilla massa. Suspendisse vel pretium tellus. Sed volutpat, turpis a ultricies sollicitudin, est mauris mattis metus, eget sodales est nisi sed orci. Aliquam aliquet tincidunt nisl eget porttitor. Nunc eleifend ultrices est quis eleifend.',
                        time: 2132121,
                        pinned: true,
                        category: {
                            id: "222",
                            name: '分类一'
                        }
                    })
                }
                return createResponse<ArticleMetadata[]>(200, "ok", result)
            })

            this.get("/admin/category/:cid", (_, req) => {
                return createResponse<Category>(200, "ok", {
                    id: req.params.cid,
                    name: "主目录",
                    children: [
                        {
                            id: uniqueId(),
                            name: "分类一"
                        },{
                            id: uniqueId(),
                            name: "分类二"
                        },{
                            id: uniqueId(),
                            name: "分类三"
                        }
                    ]
                })
            })
            
            this.delete("/admin/category/:cid", (_, req) => {
                return createResponse(200, "ok")
            })

            this.post("/admin/category/:cid", (_, req) => {
                return createResponse(200, "ok")
            })

            this.get("/admin/articles", (_, req) => {
                return createResponse<ArticlePageResult>(200, "ok", {
                    count: 1000,
                    data: []
                })
            })

            this.get("/category/:cid", (_, request) => {
                return createResponse<CategoryLevel>(200, "ok", {
                    current: {
                        id: request.params.cid,
                        name: "主目录"
                    },
                    children: [
                        {
                            id: "1",
                            name: "分类一"
                        },{
                            id: "2",
                            name: "分类二"
                        },{
                            id: "3",
                            name: "分类三"
                        }
                    ]
                })
            })
        }
    })
}