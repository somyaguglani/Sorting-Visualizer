const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";

//---------------FUNCTION FOR MERGE SORT ANIMATIONS TO WORK--------------

export function mergeSort(stateArray) {
  const animations = getMergeSortAnimations(stateArray);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.querySelectorAll(`.arrayBar`);
    const isColorChange = i % 3 !== 2; //[i,j]
    if (isColorChange) {
      const [first, second] = animations[i];
      const firstStyle = arrayBars[first].style;
      const secondStyle = arrayBars[second].style;
      console.log(firstStyle.secondStyle);
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        firstStyle.backgroundColor = color;
        secondStyle.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS);
    } else {
      setTimeout(() => {
        const [first, newHeight] = animations[i];
        const firstStyle = arrayBars[first].style;
        firstStyle.height = `${newHeight}px`;
      }, i * ANIMATION_SPEED_MS);
    }
  }
}

export function getMergeSortAnimations(stateArray) {
  const animations = [];
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
export function mergeSortHelper(
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
export function doMerge(
  mainArray,
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
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= mid) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIndex) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export default mergeSort;
