class Explosion {
    constructor({ x, y }) {
        this.x = y;
        this.x = y;
        this.particles = []
    }

    create() {
        let particle = new Particle({
            x: this.x,
            y: this.y,
            particleSize: 1,
            speed: 1,
            color: COLOR.YELLOW
        });

        particle.setUpdateMethod((p) => {
            
            
        });

        particle.setResetMethod((p, h, w) => {
            if (p.y > h) {
                p.x = getRandomInt(w);
                p.y = 0;
            }
        });

        this.particles.push(particle);
    }

    draw(ctx) {
        let particles = this.particles;
        particles.forEach((particle) => {
            particle.draw(ctx);
        })
    }

    update() {
        let particles = this.particles;
        particles.forEach((particle) => {
            particle.performUpdate();
            particle.performReset(this.height, this.width);
        });
    }
}