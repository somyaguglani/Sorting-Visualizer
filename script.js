// -----------SELECTING THINGS FROM DOM-------------
const generateNewArray = document.querySelector(`#generateArray`);
const changeSize = document.querySelector(`#changeSize`);
const buttonsArray = document.querySelectorAll(`.algoButton`);
const sortButton = document.querySelector(`#sortButton`);
const bodyContainer = document.querySelector(`.bodyContainer`);
let width = bodyContainer.offsetWidth;
let MAX_INTERVAL_VALUE = 450;
let MIN_INTERVAL_VALUE = 10;
let LOOP_VALUE = 50;
let widthOfEachBar = width / LOOP_VALUE - (width / LOOP_VALUE) * 10;
let stateArray = [];

//-------------FUNCTION FOR RESETTING ARRAY----------

async function resetArray() {
  const currentArray = [];
  for (let i = 0; i < LOOP_VALUE; i++) {
    currentArray.push(
      randomNumberFromInterval(MIN_INTERVAL_VALUE, MAX_INTERVAL_VALUE)
    );
  }
  stateArray = [...currentArray];
}

function randomNumberFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//-----------FUNCTION FOR RENDERING ARRAY-----------------

function renderingArray() {
  const currentArray = stateArray;
  return currentArray.map((value, index) => {
    return `<div class="arrayBar" data-key= "${index}" style="height: ${value}px ; width : ${widthOfEachBar}px ";></div>`;
  });
}

//----------------FUNCTION FOR DISPLAYING ARRAY ---------------

function resetAndRenderArray() {
  resetArray().then(function() {
    const currentArray = renderingArray().join(``);
    bodyContainer.innerHTML = currentArray;
  });
}

resetAndRenderArray();

//------------EVENT LISTENERTS--------------

generateNewArray.addEventListener(`click`, resetAndRenderArray);
//set a generic value for range
//things cut after complessing
//toolbar changes height
