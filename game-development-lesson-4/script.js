const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

// getBoundingClientRect is very usefull javascript method
// it returns an object providing information about the size of an element
// and its position relative to the viewport

// iskame animaciq na eksploziq
// taq animaciq iskame da se sluchi na opredelena lokaciq
// i tochno zatova konstruktora priema x i y koordinati

class Explosion {
    constructor(x, y) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7; // scaling
        this.height = this.spriteHeight * 0.7; // to keep the same aspect ratio, they should be divided by the same number
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
        // If you want to divide a number by two you can always multiply by 0.5. Multiplication is faster than division CPU wise. Example width * 0.5 is faster than width / 2
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0;
        this.timer = 0;
        this.sound = new Audio();
        this.sound.src = 'boom.ogg';
    }

    update() {
        if (this.frame === 0) this.sound.play();
        this.timer++;
        if (this.timer % 10 === 0) {
            this.frame++;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

window.addEventListener('click', function (e) {
    createAnimation(e);
});

// We can connect the creation of an animation to the mousemove event
// that way every time the mouse has been moved an animation is going to appear
/*window.addEventListener('mousemove', function (e) {
    createAnimation(e);
});*/

function createAnimation(e) {
    // this event object has information inside of it
    // there is information on where on the screen exactly the click ocurred
    // i say screen and not canvas, meaning that if the canvas is places on different part of the page
    // that should be kept in mind, that's why we use canvasPosition and getBoundingClientRect function

    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        // every explosion is happening in 5 frames (in the sprite we have 5 different images for the different stages of the explosion)
        // so when every stage of the explosion has happened, remove the explosion from the array
        if (explosions[i].frame > 5) {
            explosions.splice(i, 1);
            i--; // we put that because otherwise the other element in the array that follow would have not been showed
        }
    }
    requestAnimationFrame(animate);
}
animate();

// Now that we have the code for making an explosion appear, we can connect that code
// to the code for collision detection, that way we can have an explosion when two objects collide