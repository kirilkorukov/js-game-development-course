const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 15;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png';

// tova e za da sme sigurni che shte se zapochne kakvato i da e animaciq kogato vsichkite
// resursi koito imame (vsichkite snimki/layers) da sa zaredeni
window.addEventListener('load', function() {
    const slider = document.getElementById('slider');
    slider.value = gameSpeed;
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = gameSpeed;
    slider.addEventListener('change', function (e) {
        gameSpeed = e.target.value;
        showGameSpeed.innerHTML = e.target.value;
    });
    
    // realno edinstveno kakvoto e v Layer e parallax logikata deto trqbva da shvana
    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            //this.x2 = this.width; // where we draw the second image
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update() {
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width) {
                this.x = 0;
            }
            this.x = this.x - this.speed;
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }
    
    const layer1 = new Layer(backgroundLayer1, 0.2);
    const layer2 = new Layer(backgroundLayer2, 0.4);
    const layer3 = new Layer(backgroundLayer3, 0.6);
    const layer4 = new Layer(backgroundLayer4, 0.8);
    const layer5 = new Layer(backgroundLayer5, 1);
    
    const gameObjects = [layer1, layer2, layer3, layer4, layer5];
    
    // animate imeto e custom, moje kakvoto iskame ime da slojim i e ok
    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gameObjects.forEach(object => {
            object.update();
            object.draw();
        });
        requestAnimationFrame(animate);
    };
    animate();
});

// edna do druga slagame 2 layera snimkite
// function animate() {
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     ctx.drawImage(backgroundLayer1, x, 0);
//     ctx.drawImage(backgroundLayer1, x2, 0);
//     if(x < -2400) x = 2400 + x2 - gameSpeed;
//     else x -= gameSpeed;
//     if(x2 < -2400) x2 = 2400 + x - gameSpeed;
//     else x2 -= gameSpeed;
//     requestAnimationFrame(animate);
// };