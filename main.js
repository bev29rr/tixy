const CIRCLE_AMOUNT = 8;

const canvasPresets = [
    {
        code: 'x > y',
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
        tixyTray.innerHTML += `
            <canvas width="${canvasWidth}" height="${canvasHeight}" id="canvas${index}"></canvas>
            <input type="text" class="inputBox" id="input${index}">
        `;
        
        const inputBox = document.getElementById(`input${index}`);
        inputBox.addEventListener("input", function() {
            drawCanvas(index, event.target.value)
        });

        drawCanvas(index, value.code);
    });
}

function drawCanvas(id, code) {
    const canvas = document.getElementById(`canvas${id}`);
    const ctx = canvas.getContext("2d");

    const radius = canvas.width / CIRCLE_AMOUNT / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let i = 0;
    for (let x = 0; x < CIRCLE_AMOUNT; x++) {
        for (let y = 0; y < CIRCLE_AMOUNT; y++) {
            const state = tixy(0, i, x, y, code);
            if (state == true) {
                let color = `white`;
                if (state === true) {
                    color = `white`;
                } else if (state < 0) {
                    color = `red`;
                }
                ctx.beginPath();
                ctx.arc(radius + radius * 2 * x, radius + radius * 2 * y, radius, 0, 2 * Math.PI);

                ctx.fillStyle = color;
                ctx.fill();
            } else if (state < 0) {
                color = `red`;
                ctx.beginPath();
                ctx.arc(radius + radius * 2 * x, radius + radius * 2 * y, radius, 0, 2 * Math.PI);

                ctx.fillStyle = color;
                ctx.fill();
            } 
            i++;
        }
    }
}

function tixy(t, i, x, y, code) {
    return eval(code);
}

function logInput(event) {
    console.log(event.target.value);
}

document.addEventListener("DOMContentLoaded", function() {
    initCanvas();
});