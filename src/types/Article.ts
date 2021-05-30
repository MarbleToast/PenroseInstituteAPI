import { Field, ObjectType } from "type-graphql"

@ObjectType({ description: "An article." })
export class Article {
    @Field()
    title: string

    @Field()
    creationDate: Date

    @Field()
    content: string
}
