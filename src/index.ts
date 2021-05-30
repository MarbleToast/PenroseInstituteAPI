import * as path from "path"

import { ApolloServer } from "apollo-server-express"
import { ArticleResolver } from "./resolvers/ArticleResolver"
import { buildSchema } from "type-graphql"
import express from "express"

const bootstrapAPI = async () => {
    const port = process.env.PORT || 6969

    // Configure express
    const app = express()

    // Build GraphQL schema based on SDL definitions and resolvers maps
    const schema = await buildSchema({ resolvers: [ArticleResolver], emitSchemaFile: path.resolve(__dirname, "schema.gql") })

    // Build Apollo server
    const apolloServer = new ApolloServer({ schema, playground: true })
    apolloServer.applyMiddleware({ app })

    // Run server
    app.listen({ port }, () => {
        console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`)
    })
}

bootstrapAPI()
