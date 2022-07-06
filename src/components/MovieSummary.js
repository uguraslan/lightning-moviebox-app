import { Lightning } from '@lightningjs/sdk'

export default class MovieSummary extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      w: 1800,
      h: 640,
      x: 0,
      y: 330,
      color: 0xff111111,
      Image: {
        x: 20,
        y: 20,
        w: 1067,
        h: 600,
        src: null,
      },
      Title: {
        x: 1110,
        y: 20,
        h: 50,
        mount: 0,
        text: {
          text: '',
          fontSize: 30,
          textColor: 0xffe1e1e1,
          shadow: true,
        },
      },
      Overview: {
        x: 1110,
        y: 80,
        h: 500,
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
