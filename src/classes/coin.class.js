import { w, h } from '../app';
import { Circle } from './circle.class';

export class Coin extends Circle {
  random() {
    this.circle.x = this.radius + Math.random() * (w - 2 * this.radius);
    this.circle.y = this.radius + Math.random() * (h - 2 * this.radius);
    this.update();
  }

  update() {
    const s = 1 + Math.sin(new Date() * 0.01) * 0.2;
    this.circle.scale.set(s, s);
  }
}
