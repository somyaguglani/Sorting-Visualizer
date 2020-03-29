import mergeSort from "./algorithms/mergeSort.js";
import bubbleSort from "./algorithms/bubbleSort.js";
import quickSort from "./algorithms/quicksort.js";

// -----------SELECTING THINGS FROM DOM-------------

const toolbar = document.querySelector(`.toolbar`);
const rootContainer = document.querySelector(`.rootContainer`);
console.dir(toolbar);
console.dir(rootContainer);
const generateNewArray = document.querySelector(`#generateArray`);
const changeSize = document.querySelector(`#changeSize`);
const buttonsArray = document.querySelectorAll(`.algoButton`);
const sortButton = document.querySelector(`#sortButton`);
const bodyContainer = document.querySelector(`.bodyContainer`);
let height = rootContainer.offsetHeight - toolbar.offsetHeight;
let width = rootContainer.offsetWidth;
console.log(width, height);
let MAX_INTERVAL_VALUE = height;
let MIN_INTERVAL_VALUE = 10;
const scaling = {
  changeSize: 73
};
let widthOfEachBar = Math.floor(width / (15 * scaling.changeSize));
let stateArray = [];

//-------------FUNCTION FOR RESETTING ARRAY----------

async function resetArray() {
  const currentArray = [];
  for (let i = 0; i < scaling.changeSize; i++) {
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
    return `  <div class="arrayBar" data-key= "${index}" style="height: ${value}px ; width : ${widthOfEachBar}px ";></div>`;
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

//--------------FUNCTION FOR SORT BUTTON------------

function handleSort(e) {
  //mergeSort(stateArray);
  // bubbleSort(stateArray);
  quickSort(stateArray);
  //choose options
}
//make listeners for each sort

//------------FUNCTION FOR HANDLING SIZE--------------

function handleSize(e) {
  const value = e.currentTarget.value;
  scaling[changeSize.id] = value;
  resetAndRenderArray();
}

//------------EVENT LISTENERTS--------------

generateNewArray.addEventListener(`click`, resetAndRenderArray);
sortButton.addEventListener(`click`, handleSort);
changeSize.addEventListener(`input`, handleSize);
