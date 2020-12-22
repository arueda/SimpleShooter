class Star extends Particle {
    constructor({x, y, particleSize, speed}) {
        super({x, y, particleSize, speed, color: COLOR.WHITE});

        this.setUpdateMethod((p) => {
            p.y += p.speed;
        });

        this.setResetMethod((p, h, w) => {
            if(p.y > h) {
                p.x = getRandomInt(w);
                p.y = 0;
            }
        });

        this.setDrawMethod( (p, ctx) => {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.particleSize, p.particleSize);
        });
    }
}

class StarField {
    constructor(w, h, particleSize, maxParticles) {
        this.width = w;
        this.height = h;
        this.particles = [];

        var i = 0;
        for (i = 0; i < maxParticles; i++) { 
            this.emit(particleSize);
        }
    }

    emit(particleSize) {
        let x = getRandomInt(this.width);
        let y = getRandomInt(this.height);
        let speed = getRandomInt(3);

        let star = new Star({x: x,
                            y: y, 
                            particleSize: particleSize, 
                            speed: speed+ 1});

        this.particles.push(star); 
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