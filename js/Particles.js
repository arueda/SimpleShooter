class Particle {
    constructor(x, y, particleSize, speed) {
        this.x = x;
        this.y = y;
        this.particleSize = particleSize;
        this.speed = speed;
    } 

    update() {
        this.y += this.speed;
        return this.y;
    }

    reset(w) {
        this.x = getRandomInt(w);
        this.y = 0;
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.particleSize, this.particleSize);
    }
}

class ParticleEmitter {
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

        let particle = new Particle(x,y, particleSize, speed + 1);
        this.particles.push(particle); 
    }

    draw(ctx) {
        this.particles.forEach( (particle) => {
            particle.draw(ctx);
        })
    }

    update() {
        this.particles.forEach( (particle) => {
            let updatedY = particle.update();
            if(updatedY > this.height) {
                particle.reset(this.width);
            }
        })
    }
}