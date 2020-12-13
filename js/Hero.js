let direction = {
    NONE: 'none',
    LEFT: 'left',
    RIGHT: 'right'
};

class SpaceShip {

constructor(x, y) {
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

draw(ctx) {

    ctx.fillStyle = "red";
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
    ctx.fillStyle = "blue";
    ctx.moveTo(this.x, this.y + 10);
    ctx.lineTo(this.x - 3, this.y + 20);
    ctx.lineTo(this.x + 3, this.y + 20);
    ctx.fill();

    this.lassers.draw(context);
}

update() {
    switch (this.movingDirection) {
        case direction.LEFT:
            this.x -= 5;
            break;
        case direction.RIGHT:
            this.x += 5;
            break;
    }
    this.flame += 1;
    if (this.flame > 8) {
        this.flame = 4;
    }
    this.lassers.update();
}
};