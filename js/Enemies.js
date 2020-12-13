class Enemy {
    constructor(x, y, maxSpeed) {
        this.x = x;
        this.y = y;
        this.flame = 4;
        this.maxSpeed = maxSpeed;
        this.speed = 1 + getRandomInt(maxSpeed);
    }

    update() {
        this.flame += 1;
        if (this.flame > 8) {
            this.flame = 4;
        }
        this.y += this.speed;
        return this.y;
    }

    reset() {
        this.x = 20 + getRandomInt(600);
        this.y = 0;
        this.speed = 1 + getRandomInt(this.maxSpeed);
    }

    draw(ctx) {
        let size = 33 - this.speed;
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.x, this.y - size, this.flame, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - 10, this.y - size);
        ctx.lineTo(this.x, this.y - size);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "lightgray";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 10, this.y - size);
        ctx.lineTo(this.x, this.y - size);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.moveTo(this.x, this.y - 10);
        ctx.lineTo(this.x - 3, this.y - 20);
        ctx.lineTo(this.x + 3, this.y - 20);
        ctx.fill();
    }

}

class EnemyEmitter {
    
    constructor(resetValue) {
        this.enemies = []
        this.resetValue = resetValue;

        var i = 0;
        for (i = 0; i < 6; i++) {
            this.enemies.push(new Enemy(getRandomInt(600), 0, 8));
        }
    }

    draw(ctx) {
        this.enemies.forEach((enemy) => {
            enemy.draw(ctx)
        })
    }

    update() {
        this.enemies.forEach((enemy) => {
            let newPosition = enemy.update();
            if (newPosition > this.resetValue) {
                enemy.reset();
            }
        })
    }
}