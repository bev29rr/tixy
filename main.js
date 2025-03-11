const CIRCLE_AMOUNT = 8;

const canvasPresets = [
    {
        code: 'i == 0',
        help: 'Haha, no!'
    }
];
let canvasList = [];

function initCanvas() {
    const tixyTray = document.getElementById('tixy-tray');
    
    const percent = 0.2;
    const canvasWidth = window.innerWidth * 0.2;
    const canvasHeight = canvasWidth;

    canvasPresets.forEach((value, index) => {
        tixyTray.innerHTML += `<canvas width="${canvasWidth}" height="${canvasHeight}" id="canvas${index}">`;
        drawCanvas(index, value.code);
        console.log("added");
    });
}

function drawCanvas(id, code) {
    const canvas = document.getElementById(`canvas${id}`);
    const ctx = canvas.getContext("2d");

    const radius = canvas.width / CIRCLE_AMOUNT / 2;

    let i = 0;
    for (let x = 0; x < CIRCLE_AMOUNT; x++) {
        for (let y = 0; y < CIRCLE_AMOUNT; y++) {
            const state = tixy(0, i, x, y);
            if (state == true) {
                color = `white`;
                ctx.beginPath();
                ctx.arc(radius + radius * 2 * x, radius + radius * 2 * y, radius, 0, 2 * Math.PI);

                ctx.fillStyle = color;
                ctx.fill();
            } else {
            } 
            i++;
        }
    }
}

function tixy(t, i, x, y) {
    if (x > y) console.log(`${x},${y}`);
    return x == y;
}

document.addEventListener("DOMContentLoaded", function() {
    initCanvas();
});