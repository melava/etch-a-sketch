let container = document.querySelector('div.container');
let containerSize = 700;
let x = 16;
let num = x * x;
let caseSize = Math.floor((containerSize / x - 2) * 10) / 10;

container.style.height = containerSize+'px';
container.style.width = containerSize+'px';


function addCase(num) {
    for (let i = 0; i < num; i++) {
        let gridCase = document.createElement('div');
        gridCase.classList.add('case');
        gridCase.style.width = caseSize+'px';
        gridCase.style.height = caseSize+'px';
        container.appendChild(gridCase);
    }
}

function addHoverClass(e){
    e.target.classList.add('hover');
}
function removeHoverClass(e){
    e.target.classList.remove('hover');
}
function listenToCases() {
    let gridCases = document.querySelectorAll('.case');
    gridCases.forEach(gridCase => {
        gridCase.addEventListener('mouseenter', addHoverClass);
        //gridCase.addEventListener('mouseleave', removeHoverClass);
    });
}
function askNewGrid() {
    x = Number(prompt('How many pixel per side do you want ?'));
    while (x > 100 || x < 1 || isNaN(x)) {
        alert('You must enter a number between 1 and 100');
        x = Number(prompt('How many pixel per side do you want ?'));
    }
    caseSize = Math.floor((containerSize / x - 2) * 10) / 10;
    addCase(x * x);
    listenToCases();
}

function resetGrid(e){
    let allCases = document.querySelectorAll('div.case');
    allCases.forEach(oneCase => {
        oneCase.remove();
    });
    askNewGrid();
}

let resetButton = document.querySelector('button.reset');
resetButton.addEventListener('click', resetGrid);

addCase(num);
listenToCases();