/**@typedef Segment
 * @prop {Number} lenght
 * @prop {{x,y}[]} pos 
 */
class Chain {
    constructor(segments, lenght) {
        /**@type {Segment[]} */
        this.chain = [];
        for (let i = 0; i < segments; i++) {
            var segment = { pos: [{ x: 0, y: 0 }, { x: Math.random(), y: Math.random() }], lenght: lenght };
            this.chain.push(segment);
        }
    }

    draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(this.chain[0].pos[0].x, this.chain[0].pos[0].y);
        //ctx.lineTo(this.chain[0].pos[1].x, this.chain[0].pos[1].y);
        for (let i = 0; i < 1; i++) {
            var segment = this.chain[i];
            ctx.lineTo(segment.pos[1].x, segment.pos[1].y);
        }
        
        //ctx.lineTo(segment.pos[0].x, segment.pos[0].y);
        ctx.stroke()
    }


    move(x, y, backwards = false) {
        var i = (backwards) ? this.chain.length - 1 : 0
        this.chain[i].pos[0].x = x
        this.chain[i].pos[0].y = y

        for (let num = 0; num < this.chain.length; num++) {

            i = (backwards) ? this.chain.length - 1 - num : num

            var segment = this.chain[i];
            var dx = segment.pos[1].x - segment.pos[0].x
            var dy = segment.pos[1].y - segment.pos[0].y

            var lenght = Math.sqrt((dx * dx) + (dy * dy))

            var lenghtmodifier = segment.lenght / lenght

            dx *= lenghtmodifier
            dy *= lenghtmodifier

            var nextsegment = this.chain[i + ((backwards) ? -1 : 1)];
            segment.pos[1].x = segment.pos[0].x + dx
            segment.pos[1].y = segment.pos[0].y + dy


            if (!nextsegment) continue
            nextsegment.pos[0].x = segment.pos[1].x
            nextsegment.pos[0].y = segment.pos[1].y
        }
    }
}