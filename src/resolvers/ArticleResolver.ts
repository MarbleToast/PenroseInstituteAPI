import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { app } from ".."

import { Article } from "../types/Article/Article"
import { ArticleInput } from "../types/Article/ArticleInput"

@Resolver(() => Article)
export class ArticleResolver {
    private items: Article[] = [{ content: "Hi", creationDate: new Date(), title: "whoa" }]

    @Query(() => Article, { nullable: true })
    async getArticle(@Arg("title") titleToFind: string): Promise<Article | undefined> {
        return await app.locals.pool.query("SELECT * FROM articles WHERE title = $1", [titleToFind])
    }

    @Query(() => [Article])
    async getArticles(): Promise<Article[]> {
        return await this.items
    }

    @Mutation(() => Article)
    async addArticle(@Arg("article") input: ArticleInput): Promise<Article> {
        const a = Object.assign(new Article(), {
            title: input.title,
            content: input.content,
            creationDate: new Date()
        })
        await this.items.push(a)
        return a
    }
}
