function getContent(algoNumber) {
  const bubblesortAlgoHeading = "BUBBLE SORT";
  const bubblesortAlgoPara = `do

  swapped = false

  for i = 1 to indexOfLastUnsortedElement-1

    if leftElement > rightElement

      swap(leftElement, rightElement)

      swapped = true

while swapped`;

  const mergesortAlgoHeading = "MERGE SORT";
  const mergesortAlgoPara = `split each element into partitions of size 1

recursively merge adjacent partitions

for i = leftPartIdx to rightPartIdx

if leftPartHeadValue <= rightPartHeadValue

copy leftPartHeadValue

else: copy rightPartHeadValue

copy elements back to original array`;

  const quicksortAlgoHeading = "QUICK SORT";
  const quicksortAlgoPara = `for each (unsorted) partition

set first element as pivot

  storeIndex = pivotIndex + 1

  for i = pivotIndex + 1 to rightmostIndex

    if element[i] < element[pivot]

      swap(i, storeIndex); storeIndex++

  swap(pivot, storeIndex - 1)`;

  const heapsortAlgoHeading = "HEAP SORT";
  const heapsortAlgoPara = `heap_size = N;

        build_maxheap(Arr);
        for(int i = N; i >= 2 ; i-- )
        {
            swap|(Arr[ 1 ], Arr[ i ]);
            heap_size = heap_size - 1;
            max_heapify(Arr, 1, heap_size);
        }
    }`;

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
