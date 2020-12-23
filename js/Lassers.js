
class Lasser {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        ctx.fillStyle = "#2ECCFA";
        ctx.fillRect(this.x, this.y, 3, 5);
    }

    update() {
        this.y -= 4;
        return this.y;
    }
}

class Lassers {

    constructor(lasserCapacity) {
        this.lasserCapacity = lasserCapacity;
        this.lassers = []
    }

    fire(x, y) {
        this.lassers.push(new Lasser(x,y))
    }            

    draw(ctx) {
        this.lassers.forEach((lasser) => {
            lasser.draw(ctx)
        })
    }

    checkCollisions(objects, onCollision) {
        var collisions = 0
        this.lassers.forEach((lasser) => {
            objects.forEach((enemy) => {
                if(lasser.x > enemy.x - 10 && 
                   lasser.x < enemy.x + 10 && 
                   lasser.y > enemy.y && lasser.y < enemy.y + 20) {
    
                    collisions += 1;
                    onCollision(enemy.x, enemy.y);
                    enemy.reset();
                }
            })
        }) 
        return collisions;
    }

    update() {
        var markForDeletion = []
        this.lassers.forEach((lasser, index) => {
            if(lasser.update() < 0) {
                markForDeletion.push(index);
            }
        })
        
        markForDeletion.forEach( (element) => {
            this.lassers.splice(element, 1);
        })
    }

    canFire() {
        return this.lassers.length < this.lasserCapacity;
    }
}