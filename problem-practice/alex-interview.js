class Practice {

    // given an array of ints of size n with a domain from 1 to n where duplicates are allowed, write a method that returns all the eligible values that are not in the array.
    static getIntsNotInArrayOfRange(arr, max, min=1) {
        const set = new Set(arr);
        const all = [];
        for(let i = min; i <= max; i++) {
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
    static binarySearch(arr, el) {
        if(!arr.length) {
            return null;
        }

        let currentMinIndex = 0;
        let currentMaxIndex = arr.length - 1;

        let currentTestIndex = Math.floor(arr.length / 2);
        let currentEl;

        while(currentMinIndex <= currentMaxIndex) {

            currentEl = arr[currentTestIndex];

            if(el === currentEl) {
                return currentTestIndex;
            }
            else if(el > currentEl) {
                currentMinIndex = currentTestIndex + 1;
                console.log(`currentMinIndex increased to ${currentMinIndex}`);
            }
            else if(el < currentEl) {
                currentMaxIndex = currentTestIndex - 1;
                console.log(`currentMaxIndex decreased to ${currentMaxIndex}`);
            }

            currentTestIndex = Math.floor((currentMinIndex + currentMaxIndex) / 2);
        }
        return null;
    }
}
