import enableElements from "../script.js";

const PRIMARY_COLOR = "red";

const SECONDARY_COLOR = "turquoise";

//-----------FUNCTION THAT GETS ANIMATIONS AND VISUALIZES THEM-----------

function heapSort(stateArray, otherObject, ANIMATION_SPEED_MS) {
  const animations = [];

  heapSortHelper(stateArray, animations);

  const arrayBars = document.querySelectorAll(`.arrayBar`);

  for (let i = 0; i < animations.length; i++) {
    if (animations[i].length === 3) {
      const [first, second, change] = animations[i];

      const firstStyle = arrayBars[first].style;
      const secondStyle = arrayBars[second].style;

      if (change === false) {
        setTimeout(() => {
          firstStyle.backgroundColor = PRIMARY_COLOR;
          secondStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const temp = firstStyle.height;
          firstStyle.height = `${secondStyle.height}`;
          secondStyle.height = `${temp}`;
          firstStyle.backgroundColor = SECONDARY_COLOR;
          secondStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
    } else if (animations[i].length === 6) {
      const [left, right, index, largest, start, change] = animations[i];

      if (start === false) {
        setTimeout(() => {
          if (left !== -1) {
            arrayBars[left].style.backgroundColor = PRIMARY_COLOR;
          }
          if (right !== -1) {
            arrayBars[right].style.backgroundColor = PRIMARY_COLOR;
          }
          arrayBars[index].style.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      } else {
        if (change === false) {
          setTimeout(() => {
            if (left !== -1) {
              arrayBars[left].style.backgroundColor = SECONDARY_COLOR;
            }
            if (right !== -1) {
              arrayBars[right].style.backgroundColor = SECONDARY_COLOR;
            }
            arrayBars[index].style.backgroundColor = SECONDARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const temp = arrayBars[index].style.height;
            arrayBars[
              index
            ].style.height = `${arrayBars[largest].style.height}`;
            arrayBars[largest].style.height = `${temp}`;

            if (left !== -1) {
              arrayBars[left].style.backgroundColor = SECONDARY_COLOR;
            }
            if (right !== -1) {
              arrayBars[right].style.backgroundColor = SECONDARY_COLOR;
            }
            arrayBars[index].style.backgroundColor = SECONDARY_COLOR;
          }, i * ANIMATION_SPEED_MS);
        }
      }
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

// -----------FUNCTION THAT ACTUALLY PERFORMS HEAP SORT---------------

function heapSortHelper(stateArray, animations) {
  const n = stateArray.length;
  for (let i = Math.floor(n / 2); i >= 0; i--) {
    heapify(stateArray, n, i, animations);
  }

  for (let i = n - 1; i >= 0; i--) {
    animations.push([0, i, false]);
    animations.push([0, i, true]);
    const temp = stateArray[0];
    stateArray[0] = stateArray[i];
    stateArray[i] = temp;

    heapify(stateArray, i, 0, animations);
  }
}

//--------FUNCTION THAT MAKES SURE THAT HEAP REMAINS MAX HEAP---------------

function heapify(stateArray, n, i, animations) {
  let largest = i;
  const l = 2 * i + 1;
  const r = 2 * i + 2;
  const currentfirst = [];
  const currentsecond = [];
  if (l < n) {
    currentfirst.push(l);
    currentsecond.push(l);
  } else {
    currentfirst.push(-1);
    currentsecond.push(-1);
  }

  if (r < n) {
    currentfirst.push(r);
    currentsecond.push(r);
  } else {
    currentfirst.push(-1);
    currentsecond.push(-1);
  }

  if (l < n && stateArray[l] > stateArray[largest]) largest = l;
  if (r < n && stateArray[r] > stateArray[largest]) largest = r;

  currentfirst.push(i);
  currentsecond.push(i);

  if (largest != i) {
    const temp = stateArray[i];
    stateArray[i] = stateArray[largest];
    stateArray[largest] = temp;
    currentfirst.push(largest);
    currentsecond.push(largest);
    currentfirst.push(false);
    currentsecond.push(true);
    currentfirst.push(true);
    currentsecond.push(true);

    animations.push(currentfirst);
    animations.push(currentsecond);
    heapify(stateArray, n, largest, animations);
  } else {
    currentfirst.push(i);
    currentsecond.push(i);
    currentfirst.push(false);
    currentsecond.push(true);
    currentfirst.push(false);
    currentsecond.push(false);
    animations.push(currentfirst);
    animations.push(currentsecond);
  }
}

/*
public class HeapSort 
{ 
	void heapify(int arr[], int n, int i) 
	{ 
	
		if (largest != i) 
		{ 
			int swap = arr[i]; 
			arr[i] = arr[largest]; 
			arr[largest] = swap; 
          [l,r,i,largest,false,true] length = 6 first false = red
          [l,r,i,largest,true,true] first true -> change then turquise
			// Recursively heapify the affected sub-tree 
			heapify(arr, n, largest); 
		} else{
        [l,r,i,i,false,true] first false = red
        [l,r,i,i,true,false] first true ->don't change then turquise  
        }
	} 


} 
*/

export default heapSort;
