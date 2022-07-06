import { Lightning } from '@lightningjs/sdk'

export default class NotFound extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      w: 1920,
      h: 1080,
      color: 0xff222222,
      Text: {
        x: 60,
        y: 20,
        w: 800,
        h: 50,
        mount: 0,
        text: {
          text: 'Not Found - 404',
          fontSize: 30,
          color: 0xffffff00,
        },
      },
    }
  }
}
