// First algorithm to check collision between rectangles (x axis aligned)
var rect1 = {
    x: 5,
    y: 5,
    width: 50,
    height: 50
};
var rect2 = {
    x: 20,
    y: 10,
    width: 10,
    height: 10
};

if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
) {
    // collision detected
}
else {
    // no collision
}

// Second algorithm to check collision between rectangles (more efficient)
if (rect1.x > rect2.x + rect2.width ||
    rect1.x + rect1.width < rect2.x ||
    rect1.y > rect2.y + rect2.height ||
    rect1.y + rect1.height < rect2.y
) {
    // no collision
}
else {
    // collision detected
}

// Circle collision detection
// takes the distance between the two centers of the circles
// and checks if it's less than radius1 + radius2 -> then we have a collision
// if the distance is the same they touch
// if the distance is more they don't collide
const circle1 = {
    x: 10,
    y: 10,
    radius: 300
};
const circle2 = {
    x: 500,
    y: 500,
    radius: 150
};

let sumOfRadii = circle1.radius + circle2.radius;
let dx = Math.abs(circle1.x - circle2.x);
let dy = Math.abs(circle1.y - circle2.y);

// Calculate other side with Pythagorean Theorem a^2 + b^2 = c^2  
let distance = Math.sqrt(dx *dx + dy * dy);


if (distance < sumOfRadii) {
    // The circles overlap each other, there is collision
}
else if (distance === sumOfRadii) {
    // The circles touch each other
}
else {
    // There is no collision
}