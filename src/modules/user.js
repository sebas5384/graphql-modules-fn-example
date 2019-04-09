import gql from 'graphql-tag'

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  extend type Query {
    users: [User]!
  }
`

const resolvers = {
  Query: {
    users: (root, args, context) => [
      { id: '1', name: 'Sebastian' },
      { id: '2', name: 'Rick' },
      { id: '3', name: 'Morty' },
    ],
  },
}

export default { typeDefs, resolvers }
