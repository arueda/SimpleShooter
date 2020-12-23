let State = {
    NONE: 'INIT',
    PLAYING: 'PLAYING',
    PAUSE: 'PAUSE',
    GAME_OVER: 'GAME_OVER'
};

class Game {
    constructor() {
        this.init();
    }

    init() {
        this.multiplier = 10;
        this.lives = 3;
        this.state = State.INIT;
        this.points = 0;
        this.spaceShip = new SpaceShip(w / 2, 400);
        this.enemyEmitter = new EnemyEmitter(510);
        this.explosionsInTheSky = new Explosions();
    }

    drawLives(ctx) {
        ctx.fillStyle = "white"
        ctx.font = '20px serif';
        ctx.fillText('❤ x ' + this.lives, 20, 60);
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
        var textX = ctx.measureText(text).width / 2;
        ctx.fillText(text, 320 - textX, 120);

        let textPts = 'PTS: ' + this.points;
        ctx.fillStyle = "white"
        ctx.font = '30px serif';
        textX = ctx.measureText(textPts).width / 2;
        ctx.fillText(textPts, 320 - textX, 240);
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
                this.drawLives(ctx);
                this.drawScore(ctx);
                this.spaceShip.draw(ctx);
                this.enemyEmitter.draw(ctx);
                this.explosionsInTheSky.draw(ctx);
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
                this.checkCollisions();
                this.explosionsInTheSky.update();
                break;

        }
    }

    checkCollisions() {
        let enemies = this.enemyEmitter.enemies;
        let hits = this.spaceShip.checkLasserCollisions(enemies, (x, y) => {
            this.explosionsInTheSky.append({x: x, y: y, color: COLOR.RED});
        });

        this.points += (hits * this.multiplier);

        if (this.spaceShip.checkEnemyCollisions(enemies, (x, y) => {
            this.explosionsInTheSky.append({x: x, y: y, color: COLOR.GREEN});
        })) {
            this.lives = this.lives - 1;
            if(this.lives == 0) {
                this.state = State.GAME_OVER;
            }
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
        } else if (this.state == State.GAME_OVER) {
            this.init();
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