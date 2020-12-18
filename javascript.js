let blackMode = document.querySelector('#black');
let greyScaleMode = document.querySelector('#greyScale');
let rainbowMode = document.querySelector('#rainbow');
let resetButton = document.querySelector('button.reset');
let clearButton = document.querySelector('button.clear');
let container = document.querySelector('div.container');
let containerSize = 700;
let pixelPerSide = 16;
let caseSize = Math.floor((containerSize / pixelPerSide - 2) * 10) / 10;

container.style.height = `${containerSize}px`;
container.style.width = `${containerSize}px`;

function addCase(area) {
    for (let i = 0; i < area; i++) {
        let gridCase = document.createElement('div');
        gridCase.classList.add('case');
        gridCase.style.width = caseSize+'px';
        gridCase.style.height = caseSize+'px';
        gridCase.style.backgroundColor = 'rgb(255, 255, 255)';
        container.appendChild(gridCase);
    }
}

function black(e){
    e.target.style.backgroundColor = "rgba(0, 0, 0, 1)";
}

function greyScale(e) {
    if (e.target.style.backgroundColor.includes('a')) {
        let rgbaArray = e.target.style.backgroundColor.split(',');
        let opacity = Number(rgbaArray[rgbaArray.length-1].replace(')',''));
        e.target.style.backgroundColor = `rgba(0, 0, 0, ${opacity + 0.1})`;
    } else {
        if (e.target.style.backgroundColor !== 'rgb(0, 0, 0)') {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        }
    } 
}

function rainbow(e) {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function whatMode(e) {
    if (blackMode.checked) {
        black(e);
    } else if (greyScaleMode.checked) {
        greyScale(e);
    } else if (rainbowMode.checked) {
        rainbow(e);
    }
}

function listenToCases() {
    let gridCases = document.querySelectorAll('.case');
    gridCases.forEach(gridCase => {
        gridCase.addEventListener('mouseenter', whatMode);
    });
}
function askNewGrid() {
    pixelPerSide = Number(prompt('How many pixel per side do you want ?'));
    while (pixelPerSide > 100 || pixelPerSide < 1 || isNaN(pixelPerSide)) {
        alert('You must enter a number between 1 and 100');
        pixelPerSide = Number(prompt('How many pixel per side do you want ?'));
    }
    caseSize = Math.floor((containerSize / pixelPerSide - 2) * 10) / 10;
    addCase(pixelPerSide * pixelPerSide);
    listenToCases();
}

function resetGrid(){
    let allCases = document.querySelectorAll('div.case');
    allCases.forEach(oneCase => {
        oneCase.remove();
    });
    askNewGrid();
}

function clearGrid() {
    let allCases = document.querySelectorAll('div.case');
    allCases.forEach(oneCase => {
        oneCase.style.backgroundColor = 'rgb(255, 255, 255)';
    });
}

resetButton.addEventListener('click', resetGrid);
clearButton.addEventListener('click', clearGrid);

addCase(pixelPerSide * pixelPerSide);
listenToCases();