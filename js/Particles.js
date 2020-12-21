

class Particle {
    constructor(x, y, particleSize, speed) {
        this.x = x;
        this.y = y;
        this.particleSize = particleSize;
        this.speed = speed;
    } 
    
    setUpdateMethod(updateMethod) {
        this.updateMethod = updateMethod;
    }

    performUpdate() {
        this.updateMethod(this);
    }

    setResetMethod(resetMethod) {
        this.resetMethod = resetMethod;
    }

    performReset(w, h) {
        this.resetMethod(this, w, h);
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

        particle.setUpdateMethod((p) => {
            p.y += p.speed;
        });

        particle.setResetMethod((p, h, w) => {
            if(p.y > h) {
                p.x = getRandomInt(w);
                p.y = 0;
            }
        });
        
        this.particles.push(particle); 
    }

    draw(ctx) {
        this.particles.forEach( (particle) => {
            particle.draw(ctx);
        })
    }

    update() {
        let particles = this.particles;
        particles.forEach( (particle) => {
            particle.performUpdate();
            particle.performReset(this.height, this.width);
        });
    }
}