class ParticleSet {
    constructor(n) {
        this.particles = {
            pos: new Float64Array(n * 2),
            vel: new Float64Array(n * 2)
        }

        var pos = this.particles.pos
        for (let i = 0; i < pos.length; i++) {
            pos[i] = Math.random() * 500
        }
    }

    update(d) {
        var pos = this.particles.pos
        var vel = this.particles.vel
        for (let i = 0; i < pos.length; i++) {
            pos[i] += vel[i] * d

            if (pos[i] > 500) { pos[i] = 500; vel[i] *= 0 }
            if (pos[i] < 0) { pos[i] = 0; vel[i] *= 0 }
            if (pos[i + 1] > 500) { pos[i + 1] = 500; vel[i + 1] *= 0 }
            if (pos[i + 1] < 0) { pos[i + 1] = 0; vel[i + 1] *= 0 }
        }
    }

    applyForces(f, d) {
        var pos = this.particles.pos
        var vel = this.particles.vel
        var force
        ctx.beginPath()
        for (let i = 0; i < pos.length; i += 2) {
            force = f(i, pos, vel)
            vel[i] += force.x * d
            vel[i + 1] += force.y * d

            if (!debug) continue
            ctx.moveTo(pos[i], pos[i + 1])
            ctx.lineTo(pos[i] + force.x * 1, pos[i + 1] + force.y * 1)
        }

        ctx.stroke()
    }

    draw(r = 10, w = 3) {
        var pos = this.particles.pos
        ctx.lineWidth = w
        ctx.beginPath()
        for (let i = 0; i < pos.length; i += 2) {
            ctx.moveTo(pos[i] + r, pos[i + 1])
            ctx.arc(pos[i], pos[i + 1], r, 0, Math.PI * 2)
        }
        ctx.stroke()
    }

}