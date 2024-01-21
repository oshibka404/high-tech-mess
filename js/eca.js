const canvas = document.getElementById('eca')
const ctx = canvas.getContext('2d');

const RULES = [
    182, 99, 30, 154, 90, 195, 161
]

let RULE = 99;

const colorPairs = [
    ['#F9EF25', '#FB613F'], // orange
    ['#DC7DF7', '#FA2521'], // pink
    ['#410CDA', '#3677AD'], // blue
    ['#F9EF25', '#8CF23C'], // green
];

const colorPair = colorPairs[Math.floor(Math.random() * colorPairs.length)];
let color = colorPair[0];
let bgColor = colorPair[1];
const PIXEL_SIZE = 4;

function drawGeneration(state, i, ctx) {
    for (let j = 0; j < state.length; j++) {
        if (state[j] === 1) {
            ctx.fillStyle = color;
        } else {
            ctx.fillStyle = bgColor;
        }
        ctx.fillRect(j * PIXEL_SIZE, i * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
    }
}

function updateState(state, ruleNumber) {
    const newState = [];
    for (let j = 0; j < state.length; j++) {
        const left = state[j - 1] || 0;
        const right = state[j + 1] || 0;
        const center = state[j];

        const rule = parseInt([left, center, right].join(''), 2); // 0-7
        const newStateBit = ruleNumber.toString(2)[rule];
        newState.push(parseInt(newStateBit, 10));
    }
    return newState;
}

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let initialState = (new Array(Math.ceil(width / PIXEL_SIZE))).fill(0);
initialState[Math.floor(initialState.length / 2)] = 1;
let ecaTicking = false;

function drawFrame() {
    initialState = updateState(initialState, RULE);
    let state = initialState;
    for (let i = 0; i < height / PIXEL_SIZE; i++) {
        drawGeneration(state, i, ctx);
        state = updateState(state, RULE);
    }
    ecaTicking = false;
}

let timeout = null;

const drawNextFrame = () => {
    if (timeout || ecaTicking) return;
    timeout = setTimeout(() => {
        requestAnimationFrame(drawFrame)
        ecaTicking = true;
        clearTimeout(timeout);
        timeout = null;
    }, 10)
}

document.body.addEventListener('mousemove', drawNextFrame)

function randomColor() {
    return '#' + Math.random().toString(16).slice(2, 8);
}

document.body.addEventListener('click', () => {
    color = randomColor();
    bgColor = randomColor();
    RULE = RULES[Math.floor(Math.random() * RULES.length)];
    drawFrame();
})

drawFrame()

