
let COLOR = {
    WHITE: 'white',
    YELLOW: 'yellow',
    RED: 'red'
};


class Particle {
    constructor({x, y, particleSize, speed, color}) {
        this.x = x;
        this.y = y;
        this.particleSize = particleSize;
        this.speed = speed;
        this.color = color;
    } 
    
    setUpdateMethod(updateMethod) {
        this.updateMethod = updateMethod;
    }

    update() {
        this.updateMethod(this);
    }

    setResetMethod(resetMethod) {
        this.resetMethod = resetMethod;
    }

    reset(w, h) {
        this.resetMethod(this, w, h);
    }

    setDrawMethod(drawMethod) {
        this.drawMethod = drawMethod;
    }

    draw(ctx) {
        this.drawMethod(this, ctx);
    }
}

