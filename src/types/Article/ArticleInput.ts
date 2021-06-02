import { Field, InputType } from "type-graphql"

import { Article } from "./Article"

@InputType({ description: "An article input." })
export class ArticleInput implements Partial<Article> {
    @Field()
    title: string

    @Field()
    creationDate: Date

    @Field()
    content: string
}
