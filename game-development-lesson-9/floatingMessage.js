export class FloatingMessage {
    constructor(value, x, y, targetX, targetY) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.markedForDeletion = false;
        this.timer = 0;
    }

    update() {
        this.x += (this.targetX - this.x) * 0.03; // this means that it will start moving fast and then as the distance 
                                                  // gets shorter it will become slower and slower, giving us a nice ease-out effect
        this.y += (this.targetY - this.y) * 0.03;
        this.timer++;
        if (this.timer > 100) this.markedForDeletion = true;
    }

    draw(ctx) {
        ctx.font = '20px Creepester';
        ctx.fillStyle = 'white';
        ctx.fillText(this.value, this.x, this.y);
        ctx.fillStyle = 'black';
        ctx.fillText(this.value, this.x + 2, this.y + 2);
    }
}