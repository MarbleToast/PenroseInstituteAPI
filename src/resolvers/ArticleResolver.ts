import { Arg, Mutation, Query, Resolver } from "type-graphql"

import { Article } from "../types/Article"

@Resolver(() => Article)
export class ArticleResolver {
    private items: Article[] = [{ content: "Hi", creationDate: new Date(), title: "whoa" }]

    @Query(() => Article, { nullable: true })
    async getArticle(@Arg("title") titleToFind: string): Promise<Article | undefined> {
        return await this.items.find(({ title }) => title == titleToFind)
    }

    @Query(() => [Article])
    async getArticles(): Promise<Article[]> {
        return await this.items
    }

    @Mutation(() => Article)
    async addArticle(@Arg("article") input: Article): Promise<Article> {
        const a = Object.assign(new Article(), {
            title: input.title,
            content: input.content,
            creationDate: new Date()
        })
        await this.items.push(a)
        return a
    }
}
