import mergeSort from "./algorithms/mergeSort.js";
import bubbleSort from "./algorithms/bubbleSort.js";
import quickSort from "./algorithms/quickSort.js";
import heapSort from "./algorithms/heapSort.js";

// -----------SELECTING THINGS FROM DOM-------------

const toolbar = document.querySelector(`.toolbar`);
const rootContainer = document.querySelector(`.rootContainer`);
const generateNewArray = document.querySelector(`#generateArray`);
const changeSize = document.querySelector(`#changeSize`);
const buttonsArray = document.querySelectorAll(`.algoButton`);
const sortButton = document.querySelector(`#sortButton`);
const bodyContainer = document.querySelector(`.bodyContainer`);

//----------CUSTOM VARIABLES OR OBJECTS---------------

let height = rootContainer.offsetHeight - toolbar.offsetHeight;
let width = rootContainer.offsetWidth;
let MAX_INTERVAL_VALUE = height - 40;
let MIN_INTERVAL_VALUE = 10;
const SELECTED_COLOR = `#82b541`;
const UNSELECTED_COLOR = `white`;

const scaling = {
  changeSize: 10
};
let stateArray = [];

const stateObject = {
  algorithm: -1,
  isRunnning: false
};

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
    return `  <div class="arrayBar" id="arrayBar_${index}" data-key= "${index}" style="height: ${value}px ; width : ${scaleWidth(
      scaling.changeSize
    )}px ";></div>`;
  });
}

//----------------FUNCTION FOR DISPLAYING ARRAY ---------------

function resetAndRenderArray() {
  if (stateObject.isRunnning) return;
  resetArray().then(function() {
    const currentArray = renderingArray().join(``);
    bodyContainer.innerHTML = currentArray;
  });
}

resetAndRenderArray();

//------------FUNCTION FOR HANDLING SIZE--------------

function handleSize(e) {
  if (stateObject.isRunnning) return;
  const value = e.currentTarget.value;
  scaling[changeSize.id] = value;
  resetAndRenderArray();
  setTimeout(() => {
    for (let i = 0; i < scaling.changeSize; i++) {
      document.getElementById(`arrayBar_${i}`).style.width = scaleWidth(
        scaling.changeSize
      );
    }
  }, 100);
}

const scaleWidth = scaleLen => {
  let widthOfEachBar = Math.floor(width / (3 * scaleLen));
  return widthOfEachBar;
};

//--------------FUNCTION FOR SORT BUTTON------------

function handleSort(e) {
  if (stateObject.isRunnning) return;

  //change color of sort,generstearry,input
  stateObject.isRunnning = true;
  const algorithm = stateObject.algorithm;
  switch (algorithm) {
    case 1:
      bubbleSort(stateArray);
      break;
    case 2:
      mergeSort(stateArray);
      break;
    case 3:
      quickSort(stateArray);
      break;
    case 4:
      heapSort(stateArray);
      break;
    default:
      return;
  }
}
//make listeners for each sort

//----------FUNCTION FOR ALGO BUTTONS-----------

function handleAlgoButtons(e) {
  if (stateObject.isRunnning) return;

  sortButton.classList.add(`running`);
  const current = e.currentTarget.id;
  stateObject.algorithm = parseInt(current);
  buttonsArray.forEach(button => {
    if (parseInt(button.id) === stateObject.algorithm) {
      button.style.color = SELECTED_COLOR;
    } else {
      button.style.color = UNSELECTED_COLOR;
    }
  });
}

//------------EVENT LISTENERTS--------------

generateNewArray.addEventListener(`click`, resetAndRenderArray);
sortButton.addEventListener(`click`, handleSort);
changeSize.addEventListener(`input`, handleSize);
buttonsArray.forEach(button => {
  button.addEventListener(`click`, handleAlgoButtons);
});
