import gql from 'graphql-tag'

import tvmazeProvider from './tvmaze/provider'

const typeDefs = gql`
  type Episode {
    id: Int!
    name: String!
    summary: String
    image: Image
    number: Int
  }

  extend type Show {
    episodes: [Episode]!
  }
`

const resolvers = {
  Show: {
    episodes: ({ id }, args, { container }) =>
      container.get(tvmazeProvider).getEpisodesByShow(id),
  },
}

export default { typeDefs, resolvers }
