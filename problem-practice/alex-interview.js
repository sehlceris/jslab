class Practice {

    // given an array of ints of size n with a domain from 1 to n where duplicates are allowed, write a method that returns all the eligible values that are not in the array.
    static getIntsNotInArrayOfRange(arr, max, min = 1) {
        const set = new Set(arr);
        const all = [];
        for (let i = min; i <= max; i++) {
            all.push(i);
        }
        return all.filter(i => !set.has(i));
    }

    // remove all elements in the list that are repeated an even amount of times
    static removeElementsInListWithEvenNumberOfOccurrences(arr) {
        const counts = {};
        arr.forEach(i => counts[i] ? counts[i]++ : counts[i] = 1);
        return [... new Set(arr.filter(i => counts[i] % 2 === 0))].sort();
    }

    // binary search
    static binarySearch(arr, el, log = false) {
        if (!arr.length) {
            return null;
        }

        let currentMinIndex = 0;
        let currentMaxIndex = arr.length - 1;

        let currentTestIndex;
        let currentEl;

        let iterations = 0;

        while (currentMinIndex <= currentMaxIndex) {

            iterations++;

            currentTestIndex = Math.floor((currentMinIndex + currentMaxIndex) / 2);

            currentEl = arr[currentTestIndex];

            if (el === currentEl) {
                return {
                    found: true,
                    item: currentEl,
                    index: currentTestIndex,
                    iterations: iterations
                };
            }
            else if (el > currentEl) {
                currentMinIndex = currentTestIndex + 1;
                log ? console.log(`currentMinIndex increased to ${currentMinIndex}`) : null;
            }
            else if (el < currentEl) {
                currentMaxIndex = currentTestIndex - 1;
                log ? console.log(`currentMaxIndex decreased to ${currentMaxIndex}`) : null;
            }

        }
        return {
            found: false,
            item: null,
            index: currentTestIndex,
            iterations: iterations
        };
    }

    // binary search (not mine) https://oli.me.uk/2013/06/08/searching-javascript-arrays-with-a-binary-search/
    static binaryIndexOf(arr, searchElement) {
        'use strict';

        let minIndex = 0;
        let maxIndex = arr.length - 1;
        let currentIndex;
        let currentElement;

        let iterations = 0;

        while (minIndex <= maxIndex) {

            iterations++;

            currentIndex = (minIndex + maxIndex) / 2 | 0;
            currentElement = arr[currentIndex];

            if (currentElement < searchElement) {
                minIndex = currentIndex + 1;
            }
            else if (currentElement > searchElement) {
                maxIndex = currentIndex - 1;
            }
            else {
                return {
                    found: true,
                    item: currentElement,
                    index: currentIndex,
                    iterations: iterations
                };
            }
        }

        return {
            found: false,
            item: null,
            index: currentIndex,
            iterations: iterations
        };
    }
}

module.exports = Practice;