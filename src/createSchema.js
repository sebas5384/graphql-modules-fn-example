import { bundle } from 'graphql-modules-fn'

import content from './modules/content'
import user from './modules/user'
import comment from './modules/comment'

const modules = [user, comment, content]

export default function createSchema() {
  return bundle(modules) //=> { schema, context }
}
