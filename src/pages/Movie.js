import { Lightning } from '@lightningjs/sdk'
import MovieDetail from '../components/MovieDetail'
import MovieList from '../components/MovieList'

export default class List extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xff222222,
      },
      MovieDetail: {
        x: 60,
        y: 0,
        w: 1800,
        h: 640,
        type: MovieDetail,
      },
      SimilarMoviesTitle: {
        x: 60,
        y: 645,
        w: 800,
        h: 30,
        text: {
          text: 'Similar Movies',
          fontSize: 30,
          color: 0xffe1e1e1,
        },
      },
      Container: {
        rect: true,
        x: 60,
        y: 690,
        w: 1800,
        h: 1000,
        SimilarMovies: {
          type: MovieList,
        },
      },
    }
  }

  set params(args) {
    this.tag('MovieDetail').patch({
      Image: {
        src: args.poster_path,
      },
      Title: {
        text: args.title,
      },
      ReleaseDate: {
        text: `Release date : ${new Date(args.release_date).toLocaleDateString()}`,
      },
      Overview: {
        text: args.overview,
      },
    })
    this.tag('SimilarMovies').patch({
      movieId: args.id,
    })
  }
  _getFocused() {
    return this.tag('SimilarMovies')
  }
}
