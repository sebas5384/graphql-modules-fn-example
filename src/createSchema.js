import { bundle } from 'graphql-modules-fn'
import createContainer from 'cartola'

import tvmazeProvider from './modules/tvmaze/provider'

import person from './modules/person'
import show from './modules/show'
import episode from './modules/episode'
import cast from './modules/cast'
import image from './modules/image'
import search from './modules/search'

const modules = [person, show, episode, cast, image, search]

const container = createContainer()
container.define(tvmazeProvider)

const context = { container }

export default function createSchema() {
  return bundle(modules, context)
}
