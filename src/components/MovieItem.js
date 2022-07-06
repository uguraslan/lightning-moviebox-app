import { Lightning } from '@lightningjs/sdk'

export default class MovieItem extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      w: 210,
      h: 310,
      color: 0xff222222,
      Image: {
        x: 105,
        y: 155,
        mountX: 0.5,
        mountY: 0.5,
        src: '',
        w: 200,
        h: 300,
      },
    }
  }

  _init() {
    this.patch({
      color: this.isSelected ? '0xffaaaa00' : '0xff222222',
      Image: {
        src: this.data.poster_path,
        alpha: this.isSelected ? 1 : 0.5,
      },
    })
  }
}
