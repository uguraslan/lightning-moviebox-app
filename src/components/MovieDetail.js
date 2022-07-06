import { Lightning } from '@lightningjs/sdk'

export default class MovieDetail extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      w: 1800,
      h: 640,
      color: 0xff222222,
      Image: {
        x: 0,
        y: 20,
        w: 400,
        h: 593,
        src: null,
      },
      Title: {
        x: 420,
        y: 20,
        w: 600,
        h: 35,
        mount: 0,
        text: {
          text: '',
          fontSize: 30,
          textColor: 0xffe1e1e1,
        },
      },
      ReleaseDate: {
        x: 420,
        y: 60,
        w: 600,
        h: 30,
        mount: 0,
        text: {
          text: '',
          fontSize: 18,
          textColor: 0xffbbbbbb,
        },
      },
      Overview: {
        rect: true,
        x: 420,
        y: 120,
        h: 300,
        mount: 0,
        text: {
          text: '',
          fontSize: 20,
          textColor: 0xffdddddd,
          lineHeight: 25,
          wordWrapWidth: 640,
        },
      },
    }
  }
}
