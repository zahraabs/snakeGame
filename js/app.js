const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
let seedX;
let seedY;
let dirX =10;
let dirY = 0;

canvas.width = 400;
canvas.height = 400;

document.addEventListener("keydown" , changeDir);

context.fillStyle = "white";
context.strokeStyle = "black";
context.fillRect(0, 0, canvas.width, canvas.height)
context.strokeRect(0, 0, canvas.width, canvas.height);

let snake = [
    { x: 100, y: 100 },
    { x: 110, y: 100 },
    { x: 120, y: 100 },
    { x: 130, y: 100 },
]

let snakeDraw = ()=>{
    snake.forEach(item => {
        context.fillStyle = "aqua";
        context.strokeStyle = "red";
        context.fillRect(item.x, item.y, 10, 10);
        context.strokeRect(item.x, item.y, 10, 10);
    });
}


let randomPosition = distance => (Math.floor(Math.random() * (distance / 10))) * 10;

let generateSeed = () => {
    seedX = randomPosition(canvas.width);
    seedY = randomPosition(canvas.height);

    snake.forEach(item => {
        if (item.x == seedX && item.y == seedY) {
            generateSeed();
        }
    })

}

let seedDraw = () => {
    context.fillStyle = "red";
    context.strokeStyle = "darkred";
    context.fillRect(seedX, seedY, 10, 10);
    context.strokeRect(seedX, seedY, 10, 10);
}

function moving () {
    const newPosition = {
        x : snake[0].x + dirX ,
        y : snake[0].y + dirY
    }
    snake.unshift(newPosition);
    if (newPosition.x == seedX && newPosition.y == seedY) {
        generateSeed()
    }else{
        snake.pop();
    }
    
}

function clear () {
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.strokeRect(0, 0, canvas.width, canvas.height);
}

function changeDir(e) {
    let pressed = e.keyCode;
    if (pressed == 37 && dirX != 10) {
        dirX = -10;
        dirY = 0;
    }   if (pressed == 39 && dirX != -10) {
        dirX = 10;
        dirY = 0;
    }  
    if (pressed == 38 && dirY != 10) {
        dirX = 0;
        dirY = -10;
    } if (pressed == 40 && dirY != -10) {
        dirX = 0;
        dirY = 10;
    }
}

generateSeed();
setInterval(()=> {
    clear();
    seedDraw();
    moving();
    snakeDraw();
} , 100)
