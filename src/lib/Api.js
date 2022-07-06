const apiKey = '3a65a201b0a3d2f1ef4c49b9fb399d9a' // this key will be removed soon
const apiURL = 'https://api.themoviedb.org/3/'
const imageBasePath = 'https://image.tmdb.org/t/p/'

const request = async (endpoint, params = {}) => {
  // default language
  params['language'] = 'en-US'

  const queryString = Object.keys(params).reduce((acc = '', key) => {
    return `${acc}&${key}=${params[key]}`
  })

  const url = `${apiURL}${endpoint}?api_key=${apiKey}&${queryString}`
  const response = await fetch(url)
  const data = await response.json()
  return data
}

const getMovies = async (page = 1) => {
  const data = await request('movie/popular', {
    page,
    region: 'US',
  })

  return formatImageURLs(data)
}

const getSimilarMovies = async (movieId, page = 1) => {
  const data = await request(`/movie/${movieId}/similar`, {
    page,
    region: 'US',
  })

  return formatImageURLs(data)
}

const formatImageURLs = data => {
  data.results = data.results.map(movie => {
    movie.poster_path = `${imageBasePath}w400${movie.poster_path}`
    movie.backdrop_path = `${imageBasePath}w1280${movie.backdrop_path}`
    return movie
  })

  return data
}

export default {
  getMovies,
  getSimilarMovies,
}
