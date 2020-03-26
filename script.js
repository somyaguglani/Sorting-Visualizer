// -----------SELECTING THINGS FROM DOM-------------
const generateNewArray = document.querySelector(`#generateArray`);
const changeSize = document.querySelector(`#changeSize`);
const buttonsArray = document.querySelectorAll(`.algoButton`);
const sortButton = document.querySelector(`#sortButton`);
const MAX_INTERVAL_VALUE = 1000;
const MIN_INTERVAL_VALUE = 5;

let stateArray = [];

//-------------FUNCTION FOR RESETTING ARRAY----------

async function resetArray() {
  console.log(`works.....`);
  const currentArray = [];
  for (let i = 0; i < 100; i++) {
    currentArray.push(
      randomNumberFromInterval(MIN_INTERVAL_VALUE, MAX_INTERVAL_VALUE)
    );
  }
  stateArray = [...currentArray];
  console.log(stateArray);
}

function randomNumberFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
resetArray();

//------------EVENT LISTENERTS--------------

generateNewArray.addEventListener(`click`, resetArray);
