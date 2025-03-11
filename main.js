let CIRCLE_AMOUNT = 16;

const canvasPresets = [
    {
        code: 'sin(t+x+y)',
        help: 'Haha, no!'
    }
];
let intervalIds = {};

const parseList = [
    ['sin', 'Math.sin'],
    ['cos', 'Math.cos'],
    ['tan', 'Math.tan']
];

function initCanvas() {
    const tixyTray = document.getElementById('tixy-tray');
    
    const percent = 0.2;
    const canvasWidth = window.innerWidth * 0.2;
    const canvasHeight = canvasWidth;

    canvasPresets.forEach((value, index) => {
        tixyTray.innerHTML += `
            <div class="tixy-group">
                <p id="timeDisplay${index}">t: 0</p>
                <canvas width="${canvasWidth}" height="${canvasHeight}" id="canvas${index}"></canvas>
                <input type="text" class="inputBox" id="input${index}" value="${value.code}">
            </div>
        `;
        
        const inputBox = document.getElementById(`input${index}`);
        inputBox.addEventListener("input", function() {
            updateCanvas(index, event.target.value)
        });

        updateCanvas(index, value.code);
    });
}

function updateCanvas(id, code) {
    beginClock(id, code);
    drawCanvas(id, code, 0);
}

function drawCanvas(id, code, t) {
    const canvas = document.getElementById(`canvas${id}`);
    const ctx = canvas.getContext("2d");

    const radius = canvas.width / CIRCLE_AMOUNT / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let i = 0;
    for (let y = 0; y < CIRCLE_AMOUNT; y++) {
        for (let x = 0; x < CIRCLE_AMOUNT; x++) {
            const state = tixy(t, i, x, y, code);

            let scalar = 1;
            let color = `white`;
            if (state > 0) {
                scalar = Math.max(0.05, Math.min(1, state));
            } else if (state < 0) {
                scalar = -1 * Math.min(-0.05, Math.max(-1, state));
            }

            if (state) {
                ctx.beginPath();
                if (state === true) {
                    color = `white`;
                } else if (state < 0) {
                    color = `red`;
                }
                ctx.arc(radius + radius * 2 * x , radius + radius * 2 * y, radius * scalar, 0, 2 * Math.PI);

                ctx.fillStyle = color;
                ctx.fill();
            } 
            i++;
        }
    }
}

function tixy(t, i, x, y, code) {
    try {
        return eval(parseCode(code));
    } catch {
        return false;
    }
}

function parseCode(code) {
    parseList.forEach((value, index) => {
        code = code.replace(value[0], value[1]);
    });
    return code;
}

function beginClock(id, code) {
    let time = 0;
    if (intervalIds[id]) {
        clearInterval(intervalIds[id]);
    }

    intervalIds[id] = setInterval(function() {
        time += 0.01;
        document.getElementById(`timeDisplay${id}`).innerHTML = `t: ${time.toFixed(1)}`;
        drawCanvas(id, code, time);
    }, 10);
}


document.addEventListener("DOMContentLoaded", function() {
    initCanvas();

    const inputSlider = document.getElementById(`circle-amount`);
    inputSlider.addEventListener('input', function() {
        document.getElementById('circleAmountDisplay').innerHTML = `Circle Quantity: ${inputSlider.value}`;
        CIRCLE_AMOUNT = parseInt(inputSlider.value, 10);
    });
});