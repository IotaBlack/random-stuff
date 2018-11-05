/**@type {HTMLCanvasElement} */
var cvs = document.getElementById('cvs')
var ctx = cvs.getContext("2d")

ctx.lineWidth = 5

var width = 500
var height = 500

cvs.width = width
cvs.height = height



var chain = new Chain(10, 50)
var ball = new Ball(200, 200, 10)
ball.vx = 50


/*cvs.addEventListener('mousemove', e => {
    chain.move(e.x,e.y)
    chain.move(0,0,true)
    chain.draw()
})*/

function frame() {
    ball.update(.1)
    chain.move(ball.x, ball.y)
    chain.move(0, 00, true)

    chain.draw()
    ball.draw()
    requestAnimationFrame(frame)
}

frame()