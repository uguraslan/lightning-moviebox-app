import { Lightning } from '@lightningjs/sdk'
import MovieList from '../components/MovieList'
import MovieSummary from '../components/MovieSummary'

export default class List extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xff222222,
      },
      PopularMoviesTitle: {
        x: 60,
        y: 20,
        w: 800,
        h: 50,
        mount: 0,
        text: {
          text: 'Popular Movies',
          fontSize: 30,
          color: 0xffffff00,
        },
      },
      Container: {
        rect: true,
        x: 60,
        y: 80,
        w: 1800,
        h: 1000,
        Movies: {
          type: MovieList,
          signals: {
            displaySummary: '_displaySummary',
          },
        },
        Summary: {
          type: MovieSummary,
        },
      },
    }
  }

  /*
    I don't know if there is a better way & place to do this. I think it should be handled in MovieSummary
    component. But I could not figure out how to do it there.
  */
  _displaySummary(movie) {
    this.tag('Summary').patch({
      alpha: 0,
      Image: {
        src: movie.backdrop_path,
      },
      Title: {
        text: movie.title,
      },
      Overview: {
        text: movie.overview,
      },
      smooth: {
        alpha: [
          1,
          {
            duration: 1.0,
            delay: 0.2,
            timingFunction: 'ease-in-out',
          },
        ],
      },
    })
  }

  _getFocused() {
    return this.tag('Movies')
  }
}
