import { w, h } from '../app';
import { Circle } from './circle.class';

export class Monster extends Circle {
  update() {
    this.circle.x += this.v.x;
    this.circle.y += this.v.y;

    if (this.circle.x >= w - this.radius || this.circle.x <= this.radius) {
      this.v.x *= -1;
    }

    if (this.circle.y >= h - this.radius || this.circle.y <= this.radius) {
      this.v.y *= -1;
    }
  }
}
