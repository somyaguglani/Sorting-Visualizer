import mergeSort from "./algorithms/mergeSort";
import bubbleSort from "./algorithms/bubbleSort.js";
import quickSort from "./algorithms/quickSort.js";
import heapSort from "./algorithms/heapSort.js";
import getContent from "./algorithms/algorithmContent.js";

// -----------SELECTING THINGS FROM DOM-------------

const toolbar = document.querySelector(`.toolbar`);
const rootContainer = document.querySelector(`.rootContainer`);
const generateNewArray = document.querySelector(`#generateArray`);
const changeSize = document.querySelector(`#changeSize`);
const buttonsArray = document.querySelectorAll(`.algoButton`);
const sortButton = document.querySelector(`#sortButton`);
const bodyContainer = document.querySelector(`.bodyContainer`);
const label = changeSize.labels[0];
const openButton = document.querySelector(`.content`);
const hiddenText = document.querySelector(`.hidden-content`);

//----------CUSTOM VARIABLES OR OBJECTS---------------

let height = rootContainer.offsetHeight - toolbar.offsetHeight;
let width = rootContainer.offsetWidth;
let MAX_INTERVAL_VALUE = height - 50;
let MIN_INTERVAL_VALUE = 10;
const SELECTED_COLOR = `#9bf02c`;
const UNSELECTED_COLOR = `white`;
const ANIMATION_UPPER_BOUND = 6000;
let ANIMATION_SPEED_MS = 2;

const scaling = {
  changeSize: 15
};
let stateArray = [];

const stateObject = {
  algorithm: -1,
  isRunning: false
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
  if (stateObject.isRunning) return;
  resetArray().then(function() {
    const currentArray = renderingArray().join(``);
    bodyContainer.innerHTML = currentArray;
  });
}

resetAndRenderArray();

//------------FUNCTION FOR HANDLING SIZE--------------

function handleSize(e) {
  if (stateObject.isRunning) return;
  let value = e.currentTarget.value;
  if (window.innerWidth < 800) {
    if (value > 15) {
      value = 15;
    }
  }
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
  if (stateObject.isRunning) return;
  stateObject.isRunning = true;
  sortButton.classList.add(`disabled`);
  generateNewArray.classList.add(`disabled`);
  changeSize.classList.add(`disabled`);
  label.classList.add(`disabled`);
  ANIMATION_SPEED_MS = Math.floor(
    ANIMATION_UPPER_BOUND / (6 * scaling.changeSize)
  );
  let otherObject = {};
  const algorithm = stateObject.algorithm;
  switch (algorithm) {
    case 1:
      bubbleSort(stateArray, otherObject, ANIMATION_SPEED_MS);
      break;
    case 2:
      mergeSort(stateArray, otherObject, ANIMATION_SPEED_MS);
      break;
    case 3:
      quickSort(stateArray, otherObject, ANIMATION_SPEED_MS);
      break;
    case 4:
      heapSort(stateArray, otherObject, ANIMATION_SPEED_MS);
      break;
    default:
      return;
  }
}

//----------FUNCTION FOR ENABLING THINGS BACK-----------

function enableElements(otherObject) {
  const { isRunning } = otherObject;
  stateObject.isRunning = isRunning;
  sortButton.classList.remove(`disabled`);
  generateNewArray.classList.remove(`disabled`);
  changeSize.classList.remove(`disabled`);
  label.classList.remove(`disabled`);
}

//----------FUNCTION FOR ALGO BUTTONS-----------

function handleAlgoButtons(e) {
  if (stateObject.isRunning) return;
  sortButton.classList.add(`running`);
  const current = e.currentTarget.id;
  stateObject.algorithm = parseInt(current);
  buttonsArray.forEach(button => {
    if (parseInt(button.id) === stateObject.algorithm) {
      button.style.color = SELECTED_COLOR;
      hiddenText.innerHTML = getContent(stateObject.algorithm);
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
const ToggleMenu = () => {
  hiddenText.classList.toggle(`open`);
};
openButton.addEventListener(`click`, () => ToggleMenu());
hiddenText.addEventListener("click", () => ToggleMenu());

export default enableElements;
