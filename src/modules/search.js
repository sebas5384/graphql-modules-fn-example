import gql from 'graphql-tag'

const typeDefs = gql`
  interface SearchResult {
    score: Float!
  }
`

export default { typeDefs }
