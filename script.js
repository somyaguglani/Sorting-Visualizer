import mergeSort from "./algorithms/mergeSort.js";

// -----------SELECTING THINGS FROM DOM-------------
const generateNewArray = document.querySelector(`#generateArray`);
const changeSize = document.querySelector(`#changeSize`);
const buttonsArray = document.querySelectorAll(`.algoButton`);
const sortButton = document.querySelector(`#sortButton`);
const bodyContainer = document.querySelector(`.bodyContainer`);
let width = bodyContainer.offsetWidth;
let height = bodyContainer.offsetHeight;
let MAX_INTERVAL_VALUE = 1.6 * height;
let MIN_INTERVAL_VALUE = 10;
const scaling = {
  changeSize: 10
};
let widthOfEachBar = Math.floor(
  document.body.clientWidth / (scaling.changeSize * 15)
);
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
  mergeSort(stateArray);
  //choose options
}
//make listeners for each sort

//------------FUNCTION FOR HANDLING SIZE--------------

function handleSize(e) {
  const value = e.currentTarget.value;
  scaling[changeSize.id] = value;
  console.log(scaling.changeSize);
  console.log(widthOfEachBar);

  resetAndRenderArray();
}

//------------EVENT LISTENERTS--------------

generateNewArray.addEventListener(`click`, resetAndRenderArray);
sortButton.addEventListener(`click`, handleSort);
changeSize.addEventListener(`input`, handleSize);
