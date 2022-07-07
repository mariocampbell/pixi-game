import {
  w,
  h,
  monsters,
  coin,
  coins,
  addMonster,
  updateCoin,
  reset,
} from '../app';
import { Circle } from './circle.class';

export class Player extends Circle {
  constructor(color, radius, v) {
    super(color, radius, v);
    this.reset();
  }

  reset() {
    this.circle.x = w / 2;
    this.circle.y = h / 2;
    this.speed = 2;
  }

  update() {
    const x = this.circle.x + this.v.x;
    const y = this.circle.y + this.v.y;
    this.circle.x = Math.min(Math.max(x, this.radius), w - this.radius);
    this.circle.y = Math.min(Math.max(y, this.radius), w - this.radius);

    monsters.forEach((m) => {
      if (this.collide(m)) {
        reset();
      }
    });

    if (this.collide(coin)) {
      updateCoin(coins + 1);
      coin.random();
      addMonster();
      this.speed = Math.min(4, this.speed + 0.2);
    }
  }
}
