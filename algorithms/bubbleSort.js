const primary = `red`;
const secondary = `turquoise`;
const TIME_INTERVAL_MS = 2;

//-----------FUNCTION THAT GETS ANIMATIONS AND VISUALIZES THEM-----------

function bubbleSort(stateArray) {
  const animations = bubblesortHelper(stateArray);
  const arrayBars = document.querySelectorAll(`.arrayBar`);
 
  for (let i = 0; i < animations.length; i++) {
    if (i % 3 == 0) {

      //changing bar's color to red
      const [first, second] = animations[i];
      const firstStyle = arrayBars[first].style;
      const secondStyle = arrayBars[second].style;
      setTimeout(() => {
        firstStyle.backgroundColor = primary;
        secondStyle.backgroundColor = primary;
      }, i * TIME_INTERVAL_MS);
    } else if (i % 3 === 1) {
        
      //changing the heights for sorting
      const [first, second, change] = animations[i];
      const firstStyle = arrayBars[first].style;
      const secondStyle = arrayBars[second].style;
      if (change === false) {
        setTimeout(() => {
          const temp = firstStyle.height;
          firstStyle.height = `${secondStyle.height}`;
          secondStyle.height = `${temp}`;
        }, i * TIME_INTERVAL_MS);
      }
    } else if (i % 3 == 2) {

            //changing bar's color to turquoise

      const [first, second] = animations[i];
      const firstStyle = arrayBars[first].style;
      const secondStyle = arrayBars[second].style;
      setTimeout(() => {
        firstStyle.backgroundColor = secondary;
        secondStyle.backgroundColor = secondary;
      }, i * TIME_INTERVAL_MS);
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
  console.log(stateArray);
  console.log(animations);
  return animations;
}

export default bubbleSort;
