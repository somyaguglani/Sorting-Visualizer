import enableElements from "../script.js";

function heapSort(stateArray, otherObject) {
  console.log(`heapsort is working`);
  otherObject.isRunning = false;
  enableElements(otherObject);
}
export default heapSort;
