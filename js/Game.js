class Game {
    constructor() {
        this.paused = false;
        this.points = 0;
        this.spaceShip = new SpaceShip(w / 2, 400);
        this.enemyEmitter = new EnemyEmitter(510);
    }

    drawPauseText(ctx) {
        let text = 'PAUSA';
        ctx.fillStyle = "white"
        ctx.font = '20px serif';
        let textX = ctx.measureText(text).width / 2;
        ctx.fillText(text, 320 - textX, 240);
    }

    drawScore(ctx) {
        ctx.fillStyle = "white"
        ctx.font = '20px serif';
        ctx.fillText('PUNTOS: ' + this.points, 20, 20);
    }

    draw(ctx) {
        if(this.paused) {
            this.drawPauseText(ctx);
            return;
        }

        this.drawScore(ctx);
        this.spaceShip.draw(ctx);
        this.enemyEmitter.draw(ctx);
    }

    update() {
        if(this.paused) {
            return;
        }
        this.spaceShip.update();
        this.enemyEmitter.update();

        this.checkCollisions()
    }

    checkCollisions() {
        let enemies = this.enemyEmitter.enemies;
        this.points += this.spaceShip.checkCollisions(enemies);
    }

    handleKeyLeft() {
        this.spaceShip.moveLeft();
    }

    handleKeyRight() {
        this.spaceShip.moveRight();
    }

    handleKeyFire() {
        this.spaceShip.fire();
    }

    togglePause() {
        console.log(this.paused);
        this.paused = !this.paused;
    }
}