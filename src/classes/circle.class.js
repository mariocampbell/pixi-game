import * as PIXI from 'pixi.js';
import { game } from '../app';

export class Circle {
  constructor(color, radius, v) {
    this.radius = radius;
    this.v = v;

    const circle = new PIXI.Graphics();
    circle.beginFill(color)
      .drawCircle(0, 0, radius)
      .endFill();
    circle.x = radius;
    circle.y = radius;
    game.stage.addChild(circle);

    this.circle = circle;
  }

  remove() {
    game.stage.removeChild(this.circle);
  }

  collide(other) {
    const dx = other.circle.x - this.circle.x;
    const dy = other.circle.y - this.circle.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    return dist < (this.radius + other.radius);
  }
}
