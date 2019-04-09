import gql from 'graphql-tag'

const typeDefs = gql`
  type Content {
    id: ID!
    title: String!
    body: String
  }

  extend type User {
    articles: [Content]!
  }
`

const resolvers = {
  User: {
    articles: (root, args, context) => [
      {
        id: '1',
        title: 'Sapiente quidem architecto',
        body:
          'Augue tempora excepteur, cras varius proident senectus minima fuga proident temporibus fuga!',
      },
      {
        id: '2',
        title: 'Fuga curae illum suscipit eget',
        body:
          'Faucibus feugiat pulvinar quam, consectetur soluta, incidunt semper! Nobis ipsum, aliquid excepteur.',
      },
    ],
  },
}

export default { typeDefs, resolvers }
