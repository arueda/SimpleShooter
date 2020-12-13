class Game {
    constructor() {
        this.spaceShip = new SpaceShip(w / 2, 400);
        this.enemyEmitter = new EnemyEmitter(510);
    }

    draw(ctx) {
        this.spaceShip.draw(ctx);
        this.enemyEmitter.draw(ctx);
    }

    update() {
        this.spaceShip.update();
        this.enemyEmitter.update();
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
}