let State = {
    NONE: 'INIT',
    PLAYING: 'PLAYING',
    PAUSE: 'PAUSE',
    GAME_OVER: 'GAME_OVER'
};

class Game {
    constructor() {
        this.state = State.INIT;
        this.paused = false;
        this.gameOver = false;
        this.points = 0;
        this.spaceShip = new SpaceShip(w / 2, 400);
        this.enemyEmitter = new EnemyEmitter(510);
    }

    drawPauseText(ctx) {
        let text = 'PAUSE';
        ctx.fillStyle = "white"
        ctx.font = '20px serif';
        let textX = ctx.measureText(text).width / 2;
        ctx.fillText(text, 320 - textX, 240);
    }

    drawGameOverText(ctx) {
        let text = 'GAME OVER';
        ctx.fillStyle = "white"
        ctx.font = '40px serif';
        let textX = ctx.measureText(text).width / 2;
        ctx.fillText(text, 320 - textX, 240);
    }

    drawPressEnterText(ctx) {
        let text = 'PRESS ENTER TO START';
        ctx.fillStyle = "white"
        ctx.font = '40px serif';
        let textX = ctx.measureText(text).width / 2;
        ctx.fillText(text, 320 - textX, 240);
    }

    drawScore(ctx) {
        ctx.fillStyle = "white"
        ctx.font = '20px serif';
        ctx.fillText('PUNTOS: ' + this.points, 20, 20);
    }

    draw(ctx) {
        switch (this.state) {
            case State.INIT:
                this.drawPressEnterText(ctx);
                break;
            case State.PAUSE:
                this.drawPauseText(ctx);
                break;
            case State.GAME_OVER:
                this.drawGameOverText(ctx);
                break;

            case State.PLAYING:
                this.drawScore(ctx);
                this.spaceShip.draw(ctx);
                this.enemyEmitter.draw(ctx);
                break;

        }
    }

    update() {

        switch (this.state) {
            case State.INIT:
                break;
            case State.PAUSE:
                break;
            case State.GAME_OVER:
                break;

            case State.PLAYING:
                this.spaceShip.update();
                this.enemyEmitter.update();
                this.checkCollisions()
                break;

        }
    }

    checkCollisions() {
        let enemies = this.enemyEmitter.enemies;
        this.points += this.spaceShip.checkLasserCollisions(enemies);

        if (this.spaceShip.checkEnemyCollisions(enemies)) {
            this.gameOver = true;
        }
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

    handleReturn() {
        if(this.state == State.INIT) {
            this.state = State.PLAYING;
        }
    }

    togglePause() {
        if(this.state == State.PAUSE) {
            this.state = State.PLAYING;
        } else if(this.state == State.PLAYING) {
            this.state = State.PAUSE;
        }
    }
}