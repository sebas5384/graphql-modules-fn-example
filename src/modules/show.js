import gql from 'graphql-tag'
import tvmazeProvider from './tvmaze/provider'

const typeDefs = gql`
  type Genre {
    id: String!
    name: String!
  }

  type Rate {
    average: Float
  }

  type Show {
    id: Int!
    name: String!
    status: String
    officialSite: String
    summary: String
    premiered: String
    genres: [Genre]
    image: Image
  }

  type SearchResultShow implements SearchResult {
    score: Float!
    show: Show
  }

  extend type Query {
    show(id: Int!): Show
    searchShows(query: String!): [SearchResultShow]!
  }
`

const resolvers = {
  Query: {
    show: async (root, { id }, { container }) =>
      container.get(tvmazeProvider).getShow(id),
    searchShows: (root, { query }, { container }) =>
      container.get(tvmazeProvider).searchShows(query),
  },
  Show: {
    genres: ({ genres }) => genres.map(name => ({ id: name, name })),
  },
}

export default { typeDefs, resolvers }
