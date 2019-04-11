import { ApolloServer } from 'apollo-server'

import createSchema from './createSchema'

export default async function createServer(port) {
  const { schema, context } = await createSchema()

  return new ApolloServer({ schema, context, tracing: true }).listen(port)
}
