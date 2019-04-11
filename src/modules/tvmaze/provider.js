import axios from 'axios'
import Agent from 'agentkeepalive'

const keepaliveAgent = new Agent({
  maxSockets: 500,
  maxFreeSockets: 10,
  timeout: 60000, // active socket keepalive for 60 seconds
  freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
})

const fetcher = axios.create({
  baseURL: 'http://api.tvmaze.com',
  timeout: 5000,
  httpAgent: keepaliveAgent,
})

fetcher.interceptors.response.use(
  ({ data }) => data,
  error => {
    throw new Error(error)
  }
)

const extractIdFromUrl = url => url.match(/\/(\d+)$/).pop()

const tvmazeProvider = () => ({
  getPerson: id => fetcher(`/people/${id}`),
  getShow: id => fetcher(`/shows/${id}`),
  getCharacter: id => fetcher(`/characters/${id}`),
  getCastByShow: id => fetcher(`/shows/${id}/cast`),
  getCastByPerson: id =>
    fetcher(`/people/${id}/castcredits`).then(items =>
      items.map(({ _links }) => ({
        character: { href: extractIdFromUrl(_links.character.href) },
        show: { href: extractIdFromUrl(_links.show.href) },
      }))
    ),
  getCrewByPerson: id => fetcher(`/people/${id}/crewcredits`),
  getEpisodesByShow: id => fetcher(`/shows/${id}/episodes`),
  searchShows: query => fetcher(`/search/shows?q=${query}`),
  searchPeople: query => fetcher(`/search/people?q=${query}`),
})

export default tvmazeProvider
