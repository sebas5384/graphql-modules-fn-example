import gql from 'graphql-tag'

const typeDefs = gql`
  type Image {
    original: String!
    medium: String
  }
`

export default { typeDefs }
