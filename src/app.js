import * as PIXI from 'pixi.js'
import gsap from "gsap";
import "./style.css";

/*
 * classes
*/
class Circle {
  constructor(color, radius, v) {
    this.radius = radius
    this.v = v

    const circle = new PIXI.Graphics()
    circle.beginFill(color)
      .drawCircle(0, 0, radius)
      .endFill()
    circle.x = radius
    circle.y = radius
    game.stage.addChild(circle)

    this.circle = circle
  }

  remove() {
    game.stage.removeChild(this.circle)
  }

  collide(other) {
    const dx = other.circle.x - this.circle.x
    const dy = other.circle.y - this.circle.y
    const dist = Math.sqrt(dx*dx + dy*dy)

    return dist < (this.radius + other.radius)

  }

}

class Monster extends Circle {
  update() {
    this.circle.x += this.v.x
    this.circle.y += this.v.y

    if (this.circle.x >= w-this.radius || this.circle.x <= this.radius) {
      this.v.x *= -1
    }

    if (this.circle.y >= h-this.radius || this.circle.y <= this.radius) {
      this.v.y *= -1
    }
  }
}

function addMonster () {
  monsters.push(new Monster(0x79a3b1, Math.random()*10 + 10, {
    x: 2 + Math.random(),
    y: 2 + Math.random()
  }))
}

class Player extends Circle {
  constructor(color, radius, v) {
    super(color, radius, v)
    this.reset()
  }

  reset() {
    this.circle.x = w/2
    this.circle.y = h/2
    this.speed = 2
  }

  update() {
    const x = this.circle.x + this.v.x
    const y = this.circle.y + this.v.y
    this.circle.x = Math.min(Math.max(x, this.radius), w-this.radius)
    this.circle.y = Math.min(Math.max(y, this.radius), w-this.radius)

    monsters.forEach( m => {
      if (this.collide(m)) {
        reset()
        return
      }
    })

  }
}

function reset() {
  monsters.forEach( m => {
    m.remove()
  })
  monsters = []
  addMonster()
  player.reset()
}

function onkeydown(event) {
  switch (event.key) {
    case 'ArrowLeft':
    case 'a':
      player.v.x = -player.speed
      pressed['left'] = true
      break

    case 'ArrowRight':
    case 'd':
      player.v.x = player.speed
      pressed['right'] = true
      break

    case 'ArrowUp':
    case 'w':
      player.v.y = -player.speed
      pressed['up'] = true
      break

    case 'ArrowDown':
    case 's':
      player.v.y = player.speed
      pressed['down'] = true
      break
  }
}

function onkeyup(event) {
  switch (event.key) {
    case 'ArrowLeft':
    case 'a':
      player.v.x = pressed['right'] ? player.speed : 0
      pressed['left'] = false
      break

    case 'ArrowRight':
    case 'd':
      player.v.x = pressed['left'] ? player.speed : 0
      pressed['right'] = false
      break

    case 'ArrowUp':
    case 'w':
      player.v.y = pressed['down'] ? player.speed : 0
      pressed['up'] = false
      break

    case 'ArrowDown':
    case 's':
      player.v.y = pressed['up'] ? player.speed : 0
      pressed['down'] = false
      break
  }
}

function setupControls() {
  window.addEventListener('keydown', onkeydown)
  window.addEventListener('keyup', onkeyup)
}


/* ------- */

const w = 512, h = 512
let monsters = []
let pressed = {}
let player
let coin
let coins

PIXI.utils.sayHello('hello pixijs')
const app = document.querySelector('#app')
const game = new PIXI.Application({
  width: w,
  height: h,
  backgroundColor: 0x456268,
  antialias: true,
})

function gameLoop() {
  player.update()
  // coin.update()
  monsters.forEach( c => {
    c.update()
  })
}
addMonster()
addMonster()
player = new Player(0xfcf8ec, 10,{ x: 0, y: 0 })
setupControls()

// game.renderer.resize(window.innerWidth, window.innerHeight)
app.appendChild(game.view)
setInterval(gameLoop, 1000/60)

