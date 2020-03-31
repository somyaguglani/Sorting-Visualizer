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
        
      max_heapify makes sure that the heap remains maxheap
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

export default getContent;
