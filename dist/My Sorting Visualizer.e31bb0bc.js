// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"algorithms/mergeSort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PRIMARY_COLOR = "red";
const SECONDARY_COLOR = "turquoise"; //-----------FUNCTION THAT VISUALIZES ANIMATIONS-----------

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
        otherObject.isRunning = false;
        (0, _index.default)(otherObject);
      }, i * ANIMATION_SPEED_MS + 1000);
    }
  }
} //-------------FUNCTION THAT GETS ANIMATION--------------


function getMergeSortAnimations(stateArray) {
  const animations = [];
  if (stateArray.length <= 1) return stateArray;
  const auxiliaryArray = [...stateArray];
  mergeSortHelper(stateArray, 0, stateArray.length - 1, auxiliaryArray, animations);
  return animations;
} //--------------FUNCTIONS THAT PERFORMS MERGE SORT--------------


function mergeSortHelper(stateArray, startIndex, endIndex, auxiliaryArray, animations) {
  if (startIndex === endIndex) return;
  const mid = Math.floor((startIndex + endIndex) / 2);
  mergeSortHelper(auxiliaryArray, startIndex, mid, stateArray, animations);
  mergeSortHelper(auxiliaryArray, mid + 1, endIndex, stateArray, animations);
  doMerge(stateArray, startIndex, mid, endIndex, auxiliaryArray, animations);
}

function doMerge(stateArray, startIndex, mid, endIndex, auxiliaryArray, animations) {
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

var _default = mergeSort;
exports.default = _default;
},{"../index.js":"index.js"}],"algorithms/bubbleSort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PRIMARY_COLOR = `red`;
const SECONDARY_COLOR = `turquoise`; //-----------FUNCTION THAT GETS ANIMATIONS AND VISUALIZES THEM-----------

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
        (0, _index.default)(otherObject);
      }, i * ANIMATION_SPEED_MS + 1000);
    }
  }
} //----------FUNCTION THAT PERFORMS BUBBLE SORT-------------


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

var _default = bubbleSort;
exports.default = _default;
},{"../index.js":"index.js"}],"algorithms/quickSort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PRIMARY_COLOR = `red`;
const SECONDARY_COLOR = `turquoise`; //-----------FUNCTION THAT GETS ANIMATIONS AND VISUALIZES THEM-----------

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
        (0, _index.default)(otherObject);
      }, i * ANIMATION_SPEED_MS + 1000);
    }
  }
} //-------------FUNCTION THAT PERFORMS QUICKSORT-----------


function quickSortDriver(stateArray, animations) {
  quickSortHelper(stateArray, 0, stateArray.length - 1, animations);
}

function quickSortHelper(stateArray, lo, hi, animations) {
  if (lo < hi) {
    const partition = findIndex(stateArray, lo, hi, animations);
    quickSortHelper(stateArray, lo, partition - 1, animations);
    quickSortHelper(stateArray, partition + 1, hi, animations);
  }
} //--------------FUNCTION THAT GETS PIVOT--------------


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

var _default = quickSort;
exports.default = _default;
},{"../index.js":"index.js"}],"algorithms/heapSort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PRIMARY_COLOR = "red";
const SECONDARY_COLOR = "turquoise"; //-----------FUNCTION THAT GETS ANIMATIONS AND VISUALIZES THEM-----------

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
            arrayBars[index].style.height = `${arrayBars[largest].style.height}`;
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
        otherObject.isRunning = false;
        (0, _index.default)(otherObject);
      }, i * ANIMATION_SPEED_MS + 1000);
    }
  }
} // -----------FUNCTION THAT ACTUALLY PERFORMS HEAP SORT---------------


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
} //--------FUNCTION THAT MAKES SURE THAT HEAP REMAINS MAX HEAP---------------


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

var _default = heapSort;
exports.default = _default;
},{"../index.js":"index.js"}],"algorithms/algorithmContent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

//--------FUNCTION FOR DISPLAYING ALGORITHMS FOR DIFFERENT SORTING TECHNIQUES---------
function getContent(algoNumber) {
  const bubblesortAlgoHeading = "BUBBLE SORT";
  const bubblesortAlgoPara = `do
   <br>
  swapped = false
 <br>
     for i = 1 to indexOfLastUnsortedElement-1
 <br>
     if leftElement > rightElement
 <br>
      swap(leftElement, rightElement)
 <br>
      swapped = true
 <br>
while swapped`;
  const mergesortAlgoHeading = "MERGE SORT";
  const mergesortAlgoPara = `split each element into partitions of size 1
 <br>
recursively merge adjacent partitions
 <br>
for i = leftPartIdx to rightPartIdx
 <br>
if leftPartHeadValue <= rightPartHeadValue
 <br>
copy leftPartHeadValue
 <br>
else: copy rightPartHeadValue
 <br>
copy elements back to original array`;
  const quicksortAlgoHeading = "QUICK SORT";
  const quicksortAlgoPara = `for each (unsorted) partition
 <br>
set first element as pivot
 <br>
  storeIndex = pivotIndex + 1
 <br>
  for i = pivotIndex + 1 to rightmostIndex
 <br>
    if element[i] < element[pivot]
 <br>
      swap(i, storeIndex); storeIndex++
 <br>
  swap(pivot, storeIndex - 1)`;
  const heapsortAlgoHeading = "HEAP SORT";
  const heapsortAlgoPara = `heap_size = N;
 <br>
        build_maxheap with array
         <br>
        for i = N to i >= 0 
         <br>
            swap(0th element,ith element)
             <br>
            heap_size = heap_size - 1
             <br>
            max_heapify(array, 1, heap_size)
             <br>
        
      max_heapify makes sure that the heap 
      </br>
      remains maxheap
    `;

  switch (algoNumber) {
    case 1:
      return `
    <h3>${bubblesortAlgoHeading}</h3>
    <p>${bubblesortAlgoPara}</p>`;

    case 2:
      return `
    <h3>${mergesortAlgoHeading}</h3>
    <p>${mergesortAlgoPara}</p>`;

    case 3:
      return `
    <h3>${quicksortAlgoHeading}</h3>
    <p>${quicksortAlgoPara}</p>`;

    case 4:
      return `
    <h3>${heapsortAlgoHeading}</h3>
    <p>${heapsortAlgoPara}</p>`;

    default:
      break;
  }
}

var _default = getContent;
exports.default = _default;
},{}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mergeSort = _interopRequireDefault(require("./algorithms/mergeSort.js"));

var _bubbleSort = _interopRequireDefault(require("./algorithms/bubbleSort.js"));

var _quickSort = _interopRequireDefault(require("./algorithms/quickSort.js"));

var _heapSort = _interopRequireDefault(require("./algorithms/heapSort.js"));

var _algorithmContent = _interopRequireDefault(require("./algorithms/algorithmContent.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
const hiddenText = document.querySelector(`.hidden-content`); //----------CUSTOM VARIABLES OR OBJECTS---------------

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
}; //-------------FUNCTION FOR RESETTING ARRAY----------

async function resetArray() {
  const currentArray = [];

  for (let i = 0; i < scaling.changeSize; i++) {
    currentArray.push(randomNumberFromInterval(MIN_INTERVAL_VALUE, MAX_INTERVAL_VALUE));
  }

  stateArray = [...currentArray];
}

function randomNumberFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
} //-----------FUNCTION FOR RENDERING ARRAY-----------------


function renderingArray() {
  const currentArray = stateArray;
  return currentArray.map((value, index) => {
    return `  <div class="arrayBar" id="arrayBar_${index}" data-key= "${index}" style="height: ${value}px ; width : ${scaleWidth(scaling.changeSize)}px ";></div>`;
  });
} //----------------FUNCTION FOR DISPLAYING ARRAY ---------------


function resetAndRenderArray() {
  if (stateObject.isRunning) return;
  resetArray().then(function () {
    const currentArray = renderingArray().join(``);
    bodyContainer.innerHTML = currentArray;
  });
}

resetAndRenderArray(); //------------FUNCTION FOR HANDLING SIZE--------------

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
      document.getElementById(`arrayBar_${i}`).style.width = scaleWidth(scaling.changeSize);
    }
  }, 100);
}

const scaleWidth = scaleLen => {
  let widthOfEachBar = Math.floor(width / (3 * scaleLen));
  return widthOfEachBar;
}; //--------------FUNCTION FOR SORT BUTTON------------


function handleSort(e) {
  if (stateObject.isRunning) return;
  stateObject.isRunning = true;
  sortButton.classList.add(`disabled`);
  generateNewArray.classList.add(`disabled`);
  changeSize.classList.add(`disabled`);
  label.classList.add(`disabled`);
  ANIMATION_SPEED_MS = Math.floor(ANIMATION_UPPER_BOUND / (6 * scaling.changeSize));
  let otherObject = {};
  const algorithm = stateObject.algorithm;

  switch (algorithm) {
    case 1:
      (0, _bubbleSort.default)(stateArray, otherObject, ANIMATION_SPEED_MS);
      break;

    case 2:
      (0, _mergeSort.default)(stateArray, otherObject, ANIMATION_SPEED_MS);
      break;

    case 3:
      (0, _quickSort.default)(stateArray, otherObject, ANIMATION_SPEED_MS);
      break;

    case 4:
      (0, _heapSort.default)(stateArray, otherObject, ANIMATION_SPEED_MS);
      break;

    default:
      return;
  }
} //----------FUNCTION FOR ENABLING THINGS BACK-----------


function enableElements(otherObject) {
  const {
    isRunning
  } = otherObject;
  stateObject.isRunning = isRunning;
  sortButton.classList.remove(`disabled`);
  generateNewArray.classList.remove(`disabled`);
  changeSize.classList.remove(`disabled`);
  label.classList.remove(`disabled`);
} //----------FUNCTION FOR ALGO BUTTONS-----------


function handleAlgoButtons(e) {
  if (stateObject.isRunning) return;
  sortButton.classList.add(`running`);
  const current = e.currentTarget.id;
  stateObject.algorithm = parseInt(current);
  buttonsArray.forEach(button => {
    if (parseInt(button.id) === stateObject.algorithm) {
      button.style.color = SELECTED_COLOR;
      hiddenText.innerHTML = (0, _algorithmContent.default)(stateObject.algorithm);
    } else {
      button.style.color = UNSELECTED_COLOR;
    }
  });
} //------------EVENT LISTENERTS--------------


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
var _default = enableElements;
exports.default = _default;
},{"./algorithms/mergeSort.js":"algorithms/mergeSort.js","./algorithms/bubbleSort.js":"algorithms/bubbleSort.js","./algorithms/quickSort.js":"algorithms/quickSort.js","./algorithms/heapSort.js":"algorithms/heapSort.js","./algorithms/algorithmContent.js":"algorithms/algorithmContent.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49869" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/My%20Sorting%20Visualizer.e31bb0bc.js.map