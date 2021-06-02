import { Arg, Mutation, Query, Resolver } from "type-graphql"
import pool from "../connection/connection"

import { Article } from "../types/Article/Article"
import { ArticleInput } from "../types/Article/ArticleInput"

@Resolver(() => Article)
export class ArticleResolver {
    @Query(() => Article, { nullable: true })
    async getArticle(@Arg("uuid") uuid: string): Promise<Article | undefined> {
        const response = await pool.query("SELECT * FROM penrose.entries WHERE uuid = $1", [uuid])
        if (response.rowCount === 0) {
            return undefined
        } else {
            return response.rows[0]
        }
    }

    @Query(() => [Article])
    async getArticles(): Promise<Article[]> {
        const response = await pool.query("SELECT * FROM penrose.entries")
        return response.rows
    }

    @Mutation(() => Article)
    async addArticle(@Arg("article") input: ArticleInput): Promise<Article> {
        const a = Object.assign(new Article(), {
            title: input.title,
            content: input.content,
            creationDate: new Date()
        })

        return a
    }
}
