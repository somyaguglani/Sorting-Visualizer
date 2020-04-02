import enableElements from "../index.js";

const PRIMARY_COLOR = `red`;
const SECONDARY_COLOR = `turquoise`;

//-----------FUNCTION THAT GETS ANIMATIONS AND VISUALIZES THEM-----------

function bubbleSort(stateArray, otherObject, ANIMATION_SPEED_MS) {
  const animations = bubblesortHelper(stateArray);
  const arrayBars = document.querySelectorAll(`.arrayBar`);

  for (let i = 0; i < animations.length; i++) {
    if (i % 3 == 0) {
      const [first, second] = animations[i];
      const firstStyle = arrayBars[first].style;
      const secondStyle = arrayBars[second].style;
      setTimeout(() => {
        firstStyle.backgroundColor = PRIMARY_COLOR;
        secondStyle.backgroundColor = PRIMARY_COLOR;
      }, i * ANIMATION_SPEED_MS);
    } else if (i % 3 === 1) {
      const [first, second, change] = animations[i];
      const firstStyle = arrayBars[first].style;
      const secondStyle = arrayBars[second].style;
      if (change === false) {
        setTimeout(() => {
          const temp = firstStyle.height;
          firstStyle.height = `${secondStyle.height}`;
          secondStyle.height = `${temp}`;
        }, i * ANIMATION_SPEED_MS);
      }
    } else if (i % 3 == 2) {
      const [first, second] = animations[i];
      const firstStyle = arrayBars[first].style;
      const secondStyle = arrayBars[second].style;
      setTimeout(() => {
        firstStyle.backgroundColor = SECONDARY_COLOR;
        secondStyle.backgroundColor = SECONDARY_COLOR;
      }, i * ANIMATION_SPEED_MS);
    }
    if (i === animations.length - 1) {
      setTimeout(() => {
        otherObject.isRunning = false;
        enableElements(otherObject);
      }, i * ANIMATION_SPEED_MS + 1000);
    }
  }
}

//----------FUNCTION THAT PERFORMS BUBBLE SORT-------------

function bubblesortHelper(stateArray) {
  const animations = [];
  for (let counter = 0; counter < stateArray.length - 1; counter++) {
    for (let j = 0; j < stateArray.length - counter - 1; j++) {
      animations.push([j, j + 1]);
      if (stateArray[j] > stateArray[j + 1]) {
        animations.push([j, j + 1, false]);
        const temp = stateArray[j];
        stateArray[j] = stateArray[j + 1];
        stateArray[j + 1] = temp;
      } else animations.push([j, j + 1, true]);
      animations.push([j, j + 1]);
    }
  }
  return animations;
}

export default bubbleSort;
