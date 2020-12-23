let direction = {
    NONE: 'none',
    LEFT: 'left',
    RIGHT: 'right'
};

class SpaceShip {

constructor(x, y) {
    this.initialX = x;
    this.x = x;
    this.y = y;
    this.flame = 4;
    this.movingDirection = direction.NONE;
    this.lassers = new Lassers(10);
}

moveLeft() {
    this.movingDirection = direction.LEFT;
}

moveRight() {
    this.movingDirection = direction.RIGHT;
}

fire() {
    if (this.lassers.canFire()) {
        this.lassers.fire(this.x, this.y);
    }
}

checkLasserCollisions(enemies, onCollision) {
    return this.lassers.checkCollisions(enemies, onCollision);
}

reset() {
    this.x = this.initialX;
    this.movingDirection = direction.NONE;
}

checkEnemyCollisions(enemies, onCollision) {
    var crash = false;
    enemies.forEach( (enemy) => {
        let xEnemyLeft = enemy.x - 10;
        let xEnemyRight = enemy.x + 10;
        let yEnemyBack = enemy.y - 30;
        // front
        let xCollissionCenter = this.x >= xEnemyLeft && this.x <= xEnemyRight;
        let yCollissionCenter = this.y < enemy.y && this.y > yEnemyBack;
        // left
        let xCollissionLeft = this.x - 10 >= xEnemyLeft && this.x -10 <= xEnemyRight;
        let yCollissionLeft = this.y + 25 < enemy.y && this.y + 25 > yEnemyBack;
        // right
        let xCollissionRight = this.x + 10 >= xEnemyLeft && this.x + 10 <= xEnemyRight;
        let yCollissionRight = this.y + 25 < enemy.y && this.y + 25 > yEnemyBack;

        if((xCollissionCenter && yCollissionCenter) || 
           (xCollissionLeft && yCollissionLeft) || 
           (xCollissionRight && yCollissionRight)) {
            onCollision(this.x, this.y);
            enemy.reset();
            this.reset();
            crash = true;
        }
    });
    return crash;
}

draw(ctx) {

    ctx.fillStyle = COLOR.RED;
    ctx.beginPath();
    ctx.arc(this.x, this.y + 25, this.flame, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - 10, this.y + 25);
    ctx.lineTo(this.x, this.y + 25);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "lightgray";
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + 10, this.y + 25);
    ctx.lineTo(this.x, this.y + 25);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = COLOR.GREEN;
    ctx.moveTo(this.x, this.y + 10);
    ctx.lineTo(this.x - 3, this.y + 20);
    ctx.lineTo(this.x + 3, this.y + 20);
    ctx.fill();

    this.lassers.draw(context);
}

update() {
    switch (this.movingDirection) {
        case direction.LEFT:
            if(this.x > 10) {
                this.x -= 5;
            }
            
            break;
        case direction.RIGHT:
            if(this.x < 630) {
                this.x += 5;
            }
            break;
    }
    this.flame += 1;
    if (this.flame > 8) {
        this.flame = 4;
    }
    this.lassers.update();
}
};