import gql from 'graphql-tag'

const typeDefs = gql`
  type Comment {
    id: ID!
    title: String!
    body: String!
    author: User!
  }

  extend type Content {
    comments: [Comment]!
  }
`

const resolvers = {
  Content: {
    comments: (root, args, context) => [
      {
        id: '1',
        title: 'Proident senectus',
        body: 'Cras varius proident senectus!',
        author: { id: '1', name: 'Sebas' },
      },
      {
        id: '2',
        title: 'Faucibus feugiat pulvinar quam',
        body: 'Consectetur soluta, incidunt semper.',
        author: { id: '2', name: 'Rick' },
      },
    ],
  },
}

export default { typeDefs, resolvers }
