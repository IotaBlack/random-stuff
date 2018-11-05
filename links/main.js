/**@type {HTMLCanvasElement} */
var cvs = document.getElementById('cvs')
var ctx = cvs.getContext("2d")

ctx.lineWidth = 5

var width = 500
var height = 500

cvs.width = width
cvs.height = height

var drag = .05
var debug = false

var particles = new ParticleSet(500)

Number.MIN_VALUE_SQRT = Math.sqrt(Number.MIN_VALUE)

function forceCalc(i, pos, vel) {

    var force = { x: 0, y: 0 }

    for (let j = 0; j < pos.length; j += 2) {

        var dx = pos[i] - pos[j]
        var dy = pos[i + 1] - pos[j + 1]



        var distsq = dx * dx + dy * dy + 0.00000001

        var dist = Math.sqrt(distsq)/25

        
        mag = -(1 / Math.pow(dist,2)) + (1 / (Math.pow(dist,2.5)))

        mag = Math.min(mag,1)

        var fx = dx / dist * mag
        var fy = dy / dist * mag
        force.x += fx - vel[i] * drag
        force.y += fy - vel[i+1] * drag
    }
    return force
}

function frame() {
    ctx.clearRect(0, 0, width, height)

    particles.applyForces(forceCalc,.01)
    particles.update(1)

    particles.draw(.2)
    requestAnimationFrame(frame)
}

frame()