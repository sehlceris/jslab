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
        return [... new Set(arr.filter(i => counts[i] % 2 !== 0))];
    }

    // binary search
    static binarySearch(arr, el, metadata = false, log = false) {
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
                log ? console.log(`found at i=${currentTestIndex} after ${iterations} iterations`) : null;
                return metadata ? {
                    found: true,
                    item: currentEl,
                    index: currentTestIndex,
                    iterations: iterations
                } : currentTestIndex;
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
        log ? console.log(`not found after ${iterations} iterations`) : null;
        return metadata ? {
            found: false,
            item: null,
            index: currentTestIndex,
            iterations: iterations
        } : null;
    }

    // swap numbers without a temp element
    static swapNumbersWithoutTempElement(a, b) {
        return [a, b];
    }
}

module.exports = Practice;