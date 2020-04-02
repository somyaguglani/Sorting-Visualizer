import enableElements from "../index.js";

const PRIMARY_COLOR = `red`;
const SECONDARY_COLOR = `turquoise`;

//-----------FUNCTION THAT GETS ANIMATIONS AND VISUALIZES THEM-----------

function quickSort(stateArray, otherObject, ANIMATION_SPEED_MS) {
  const animations = [];
  quickSortDriver(stateArray, animations);

  const arrayBars = document.querySelectorAll(`.arrayBar`);
  for (let i = 0; i < animations.length; i++) {
    if (animations[i].length === 2) {
      const [first, second] = animations[i];
      const firstStyle = arrayBars[first].style;
      const secondStyle = arrayBars[second].style;
      setTimeout(() => {
        firstStyle.backgroundColor = PRIMARY_COLOR;
        secondStyle.backgroundColor = PRIMARY_COLOR;
      }, i * ANIMATION_SPEED_MS);
    } else {
      const [first, second, finalSwap] = animations[i];
      const firstStyle = arrayBars[first].style;
      const secondStyle = arrayBars[second].style;
      if (finalSwap === 0) {
        const [first, second] = animations[i];
        const firstStyle = arrayBars[first].style;
        const secondStyle = arrayBars[second].style;
        setTimeout(() => {
          firstStyle.backgroundColor = SECONDARY_COLOR;
          secondStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      } else if (finalSwap === false) {
        setTimeout(() => {
          firstStyle.backgroundColor = SECONDARY_COLOR;
          secondStyle.backgroundColor = SECONDARY_COLOR;
          const temp = firstStyle.height;
          firstStyle.height = `${secondStyle.height}`;
          secondStyle.height = `${temp}`;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const temp = firstStyle.height;
          firstStyle.height = `${secondStyle.height}`;
          secondStyle.height = `${temp}`;
          firstStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    if (i === animations.length - 1) {
      setTimeout(() => {
        otherObject.isRunning = false;
        enableElements(otherObject);
      }, i * ANIMATION_SPEED_MS + 1000);
    }
  }
}

//-------------FUNCTION THAT PERFORMS QUICKSORT-----------

function quickSortDriver(stateArray, animations) {
  quickSortHelper(stateArray, 0, stateArray.length - 1, animations);
}

function quickSortHelper(stateArray, lo, hi, animations) {
  if (lo < hi) {
    const partition = findIndex(stateArray, lo, hi, animations);
    quickSortHelper(stateArray, lo, partition - 1, animations);
    quickSortHelper(stateArray, partition + 1, hi, animations);
  }
}

//--------------FUNCTION THAT GETS PIVOT--------------

function findIndex(stateArray, lo, hi, animations) {
  let i = lo - 1;
  const pivot = stateArray[hi];
  for (let j = lo; j < hi; j++) {
    animations.push([j, hi]);
    animations.push([j, hi, 0]);
    if (stateArray[j] < pivot) {
      i++;
      animations.push([i, j, false]);
      const temp = stateArray[i];
      stateArray[i] = stateArray[j];
      stateArray[j] = temp;
    }
  }

  animations.push([i + 1, hi, true]);
  const temp = stateArray[i + 1];
  stateArray[i + 1] = stateArray[hi];
  stateArray[hi] = temp;

  return i + 1;
}

export default quickSort;
