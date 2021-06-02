import { Field, ObjectType } from "type-graphql"

@ObjectType({ description: "An article." })
export class Article {
    @Field()
    uuid: string

    @Field()
    entryId: string

    @Field()
    title: string

    @Field()
    creationDate: Date

    @Field({ nullable: true })
    content?: string
}
