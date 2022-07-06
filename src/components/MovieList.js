import { Lightning, Router, Utils } from '@lightningjs/sdk'
import Api from '../lib/Api'
import MovieItem from './MovieItem'

export default class MovieList extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      w: 1800,
      h: 1000,
      color: 0xff222222,
      clipping: true,
      List: {
        rect: true,
        color: 0xff222222,
        flex: {
          direction: 'row',
        },
      },
      PrevItem: {
        mount: 0,
        x: -10,
        y: 130,
        Arrow: {
          src: Utils.asset('images/arrow.png'),
          rotation: Math.PI * -0.5,
        },
      },
      NextItem: {
        mount: 0,
        x: 1720,
        y: 130,
        Arrow: {
          src: Utils.asset('images/arrow.png'),
          rotation: Math.PI * 0.5,
        },
      },
    }
  }

  _construct() {
    this.itemSelected = 0
    this.animationTime = 0.4 //secs
    this.movieThumbnailWidth = 210 //px

    /*
    The component listens left & right keypress events to move the movie list horizontally and it has
    an animation attached to it. The problem is if users press left & right keys too fast, the new
    movies are selected before the previous sliding animations are finished. To prevent this, probably
    I should have force the previous animation to finish as soon as a new keypress event is received. But
    for this sample application, I decided to ignore the key events until the animation is finished.
    */
    this.disableKeyPress = {
      left: false,
      right: false,
    }
  }

  _enable() {
    this.getMovieList()
  }

  _disable() {
    this.tag('List').childList.clear()
  }

  _handleBack() {
    Router.navigate('$')
  }

  _handleEnter() {
    Router.navigate(
      'movie/' + this.tag('List').childList.getAt(this.itemSelected).data.id,
      this.tag('List').childList.getAt(this.itemSelected).data
    )
  }

  _handleRight() {
    if (this.itemSelected < this.tag('List').children.length - 1 && !this.disableKeyPress.right) {
      const newIndex = this.itemSelected + 1
      const shouldMove =
        this.tag('List').x - 210 >=
          (this.tag('List').children.length - 8) * -this.movieThumbnailWidth &&
        this.itemSelected > 3
      const newXPosition = this.tag('List').x - this.movieThumbnailWidth

      this.selectMovie(newIndex, shouldMove, newXPosition, 'right')
    }
  }

  _handleLeft() {
    if (this.itemSelected > 0 && !this.disableKeyPress.left) {
      const newIndex = this.itemSelected - 1
      const shouldMove =
        this.tag('List').x + this.movieThumbnailWidth <= 0 &&
        this.tag('List').children.length - this.itemSelected > 3
      const newXPosition = this.tag('List').x + this.movieThumbnailWidth

      this.selectMovie(newIndex, shouldMove, newXPosition, 'left')
    }
  }

  getMovieList() {
    if (this.movieId) {
      Api.getSimilarMovies(this.movieId).then(data => {
        data.results.forEach((movie, index) => {
          this.tag('List').add({
            type: MovieItem,
            isSelected: index == 0 ? true : false, //auto select first one
            data: movie,
          })
        })

        this.tag('List').patch({
          w: this.tag('List').children.length * this.movieThumbnailWidth,
        })
      })
    } else {
      Api.getMovies().then(data => {
        data.results.forEach((movie, index) => {
          this.tag('List').add({
            type: MovieItem,
            isSelected: index == 0 ? true : false, //auto select first one
            data: movie,
          })
        })

        this.tag('List').patch({
          w: this.tag('List').children.length * this.movieThumbnailWidth,
        })

        // need to display the first (automatically selected) movie summary on the screen
        this.signal('displaySummary', this.tag('List').childList.getAt(this.itemSelected).data)
      })
    }
  }

  selectMovie(newIndex, shouldMove, newXPosition, keyPressed) {
    this.disableKeyPress[keyPressed] = true

    this.removeHighlight(this.itemSelected)

    this.itemSelected = newIndex
    this.signal('displaySummary', this.tag('List').childList.getAt(this.itemSelected).data)

    this.tag('List')
      .childList.getAt(this.itemSelected)
      .animation({
        duration: this.animationTime,
        actions: [
          {
            p: 'scaleY',
            v: { 0: 1, 0.25: 1.05, 0.5: 1.1, 0.75: 1.05, 1: 1 },
          },
        ],
      })
      .start()

    // move
    if (shouldMove) {
      // if the browser's available screen width is less than the app's width (1920), when left/right key is pressed,
      // browser's horizontal scrolling takes affect before the following animation. But I did not work on that
      // issue because normally the app should be working with a fixed screen resolution and available screen width.
      this.tag('List').patch({
        smooth: {
          x: [
            newXPosition,
            {
              duration: this.animationTime,
              delay: 0,
              timingFunction: 'ease-in-out',
            },
          ],
        },
      })
    }

    this.addHighlight(newIndex)

    setTimeout(() => {
      this.disableKeyPress[keyPressed] = false
    }, this.animationTime * 1000)
  }

  removeHighlight(index) {
    this.tag('List')
      .childList.getAt(index)
      .patch({
        color: 0xff222222,
        Image: {
          alpha: 0.5,
        },
      })
  }

  addHighlight(index) {
    this.tag('List')
      .childList.getAt(index)
      .patch({
        color: 0xffaaaa00,
        Image: {
          alpha: 1,
        },
      })
  }
}
