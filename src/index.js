import createServer from './createServer'

const { PORT = 3000 } = process.env

const server = createServer(PORT).then(({ url }) => {
  console.log(`🚀 Server eready at ${url}`)
})
