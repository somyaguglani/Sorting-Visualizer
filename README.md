# SORTING VISUALIZER #
Welcome to the Sorting Visualizer ! I have made this application because algorithms in general fascinate me . So why not build something that can actually show someone what actually happens behind the scenes?
The application visualizes sorting algorithms and you can check it here ....

## MEET THE ALGORITHMS ##

### BUBBLE SORT ###

Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements "bubble" to the top of the list.
Bubble sort has a worst-case and average complexity of О(n^2), where n is the number of items being sorted.


### MERGE SORT ###

Conceptually, a merge sort works as follows:
Divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted).
Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list.
Time complexity of Merge Sort is O(nLogn) .

### QUICK SORT ###

Quicksort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. This can be done in-place, requiring small additional amounts of memory to perform the sorting.
Quicksort has the best and average time complexity of O(nLogn) and O(n^2) for the worst case.

### HEAP SORT ###

Heapsort can be thought of as an improved selection sort: like selection sort, heapsort divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element from it and inserting it into the sorted region. Unlike selection sort, heapsort does not waste time with a linear-time scan of the unsorted region; rather, heap sort maintains the unsorted region in a heap data structure to more quickly find the largest element in each step.
Although somewhat slower in practice on most machines than a well-implemented quicksort, it has the advantage of a more favorable worst-case O(n log n) runtime. Heapsort is an in-place algorithm, but it is not a stable sort.
