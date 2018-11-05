var gravity = { x: 0, y: 10 }

class Ball {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.r = r
        this.vx = 0
        this.vy = 0
    }


    update(d) {
        this.vx += gravity.x * d
        this.vy += gravity.y * d

        this.x += this.vx * d
        this.y += this.vy * d
        if (this.y > 500) this.vy *= -1
        if (this.x > 500) this.vx *= -1
        if (this.x < 0) this.vx *= -1
    }

    draw() {
        ctx.beginPath()
        ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, Math.PI * 2, false)
        ctx.stroke()
    }
}