class Explosion extends Particle {
    constructor({x, y, color}) {
        super({x, y, particleSize: 1, speed: 2, color: color});

        this.markedForDeletion = false;
        this.setUpdateMethod((p) => {
            if(this.markedForDeletion) {
                return;
            }
            p.particleSize += p.speed;
        });

        this.setResetMethod((p, h, w) => {
            if(p.particleSize > 20) {
                this.markedForDeletion = true;
            }
        });

        this.setDrawMethod( (p, ctx) => {

            if(this.markedForDeletion) {
                return;
            }

            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.particleSize, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
}

class Explosions {
    constructor() {
        this.particles = [];
    }

    append({x, y, color}) {
        let particle = new Explosion({x: x, y: y, color: color});
        this.particles.push(particle);
    }

    draw(ctx) {
        let particles = this.particles;
        particles.forEach( (particle) => {
            particle.draw(ctx);
        })
    }

    update() {
        let particles = this.particles;
        particles.forEach( (particle) => {
            particle.update();
            particle.reset(this.height, this.width);
        });
    }
    
}