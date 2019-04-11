import gql from 'graphql-tag'

import tvmazeProvider from './tvmaze/provider'

const typeDefs = gql`
  type Country {
    id: String!
    code: String!
    name: String
    timezone: String
  }

  type Person {
    id: Int!
    name: String!
    gender: String
    image: Image
    birthday: Int
  }

  type SearchResultPerson implements SearchResult {
    score: Float!
    person: Person
  }

  extend type Query {
    person(id: Int!): Person
    searchPeople(query: String!): [SearchResultPerson]!
  }
`

const resolvers = {
  Query: {
    person: (root, { id }, { container }) =>
      container.get(tvmazeProvider).getPerson(id),
    searchPeople: (root, { query }, { container }) =>
      container.get(tvmazeProvider).searchPeople(query),
  },
  Person: {
    country: ({ country }) => ({ ...country, id: country.name }),
  },
}

export default { typeDefs, resolvers }
