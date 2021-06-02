import "reflect-metadata"

import * as path from "path"

import { ApolloServer } from "apollo-server-express"
import { ArticleResolver } from "./resolvers/ArticleResolver"
import { buildSchema } from "type-graphql"
import express from "express"
import pool from "./connection/connection"

const bootstrapAPI = async () => {
    const port = process.env.PORT || 6969

    // Build GraphQL schema based on SDL definitions and resolvers maps
    const schema = await buildSchema({ resolvers: [ArticleResolver], emitSchemaFile: path.resolve(__dirname, "schema.gql") })

    // Build Apollo server
    const apolloServer = new ApolloServer({ schema, playground: true })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app })

    // Run server
    app.listen({ port }, () => {
        console.log(`API running at http://localhost:${port}${apolloServer.graphqlPath}!`)
    })
}

export const app = express()
app.locals.pool = pool
bootstrapAPI()
