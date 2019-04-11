import gql from 'graphql-tag'

import tvmazeProvider from './tvmaze/provider'

const typeDefs = gql`
  type Character {
    id: Int!
    name: String!
    image: Image
  }

  type Cast {
    character: Character
    person: Person!
    self: Boolean
    voice: Boolean
  }

  type CastCredit {
    character: Character
    show: Show
  }

  extend type Show {
    cast: [Cast]!
  }

  extend type Person {
    castCredit: [CastCredit]!
  }
`

const resolvers = {
  Show: {
    cast: ({ id }, args, { container }) =>
      container.get(tvmazeProvider).getCastByShow(id),
  },
  Person: {
    castCredit: async ({ id }, args, { container }) =>
      container.get(tvmazeProvider).getCastByPerson(id),
  },
  CastCredit: {
    character: ({ character }, args, { container }) =>
      character.href
        ? container.get(tvmazeProvider).getCharacter(character.href)
        : character,
    show: ({ show }, args, { container }) =>
      show.href ? container.get(tvmazeProvider).getShow(show.href) : show,
  },
}

export default { typeDefs, resolvers }
