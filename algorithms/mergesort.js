import enableElements from "../script.js";

const PRIMARY_COLOR = "red";

const SECONDARY_COLOR = "turquoise";

//-----------FUNCTION THAT VISUALIZES ANIMATIONS-----------

function mergeSort(stateArray, otherObject, ANIMATION_SPEED_MS) {
  const animations = getMergeSortAnimations(stateArray);
  const arrayBars = document.getElementsByClassName("arrayBar");
  for (let i = 0; i < animations.length; i++) {
    const isColorChange = i % 3 !== 2;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS);
    } else {
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;
      }, i * ANIMATION_SPEED_MS);
    }
    if (i === animations.length - 1) {
      setTimeout(() => {
        console.log(`set timeout works properly`);
        otherObject.isRunning = false;
        enableElements(otherObject);
      }, i * ANIMATION_SPEED_MS + 1000);
    }
  }
}

//-------------FUNCTION THAT GETS ANIMATION--------------

function getMergeSortAnimations(stateArray) {
  const animations = [];
  if (stateArray.length <= 1) return stateArray;
  const auxiliaryArray = [...stateArray];
  mergeSortHelper(
    stateArray,
    0,
    stateArray.length - 1,
    auxiliaryArray,
    animations
  );
  return animations;
}

//--------------FUNCTIONS THAT PERFORMS MERGE SORT--------------

function mergeSortHelper(
  stateArray,
  startIndex,
  endIndex,
  auxiliaryArray,
  animations
) {
  if (startIndex === endIndex) return;
  const mid = Math.floor((startIndex + endIndex) / 2);
  mergeSortHelper(auxiliaryArray, startIndex, mid, stateArray, animations);
  mergeSortHelper(auxiliaryArray, mid + 1, endIndex, stateArray, animations);
  doMerge(stateArray, startIndex, mid, endIndex, auxiliaryArray, animations);
}

function doMerge(
  stateArray,
  startIndex,
  mid,
  endIndex,
  auxiliaryArray,
  animations
) {
  let k = startIndex;
  let i = startIndex;
  let j = mid + 1;
  while (i <= mid && j <= endIndex) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      stateArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      stateArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= mid) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    stateArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIndex) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    stateArray[k++] = auxiliaryArray[j++];
  }
}
export default mergeSort;
