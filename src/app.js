import * as PIXI from 'pixi.js';
import {
  Monster,
  Player,
  Coin,
} from './classes';

import './style.css';

/* VARIABLES */
const app = document.querySelector('#app');
export const w = 600;
export const h = 600;
export const game = new PIXI.Application({
  width: w,
  height: h,
  backgroundColor: 0x456268,
  antialias: true,
});
export let monsters = [];
const pressed = {};
const player = new Player(0xfcf8ec, 10, { x: 0, y: 0 });
export const coin = new Coin(0xfff2cc, 10, { x: 0, y: 0 });
export let coins = 0;

const score = new PIXI.Text()
score.anchor.set(0.5)
score.x = game.screen.width / 2
score.y = 20
game.stage.addChild(score)
/* ------------ */

/* FUNCTIONS */
export function addMonster() {
  monsters.push(new Monster(0x79a3b1, Math.random() * 10 + 10, {
    x: 2 + Math.random(),
    y: 2 + Math.random(),
  }));
}

export function updateCoin(num) {
  score.text = num
  coins = num;
  // document.querySelector('#score span').innerHTML = coins;
}

export function reset() {
  monsters.forEach((m) => {
    m.remove();
  });

  monsters = [];
  addMonster();
  player.reset();
  coin.random();
  updateCoin(0);
}

function onkeydown(event) {
  switch (event.key) {
    case 'ArrowLeft':
    case 'a':
      player.v.x = -player.speed;
      pressed.left = true;
      break;

    case 'ArrowRight':
    case 'd':
      player.v.x = player.speed;
      pressed.right = true;
      break;

    case 'ArrowUp':
    case 'w':
      player.v.y = -player.speed;
      pressed.up = true;
      break;

    case 'ArrowDown':
    case 's':
      player.v.y = player.speed;
      pressed.down = true;
      break;

    default:
      break;
  }
}

function onkeyup(event) {
  switch (event.key) {
    case 'ArrowLeft':
    case 'a':
      player.v.x = pressed.right ? player.speed : 0;
      pressed.left = false;
      break;

    case 'ArrowRight':
    case 'd':
      player.v.x = pressed.left ? player.speed : 0;
      pressed.right = false;
      break;

    case 'ArrowUp':
    case 'w':
      player.v.y = pressed.down ? player.speed : 0;
      pressed.up = false;
      break;

    case 'ArrowDown':
    case 's':
      player.v.y = pressed.up ? player.speed : 0;
      pressed.down = false;
      break;

    default:
      break;
  }
}

function setupControls() {
  window.addEventListener('keydown', onkeydown);
  window.addEventListener('keyup', onkeyup);
}

function gameLoop() {
  player.update();
  coin.update();
  monsters.forEach((c) => {
    c.update();
  });
}
/* ------------ */


app.appendChild(game.view);
setInterval(gameLoop, 1000 / 60);
setupControls();
reset();
