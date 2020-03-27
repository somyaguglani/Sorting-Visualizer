//------------------CODE FOR MERGE SORT MODULE-----------------
function getMergeSortAnimations(stateArray) {
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

//------------------CODE FOR MERGE SORT MODULE OVER-----------------
