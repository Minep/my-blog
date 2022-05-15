import type { ApiResponse } from "@/api/response";
import type { Article, ArticleMetadata, CategoryLevel } from "@/helpers";
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

            this.get("/article/:aid", (_, request) => {
                return createResponse<Article>(200, "ok", {
                    id: "123",
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