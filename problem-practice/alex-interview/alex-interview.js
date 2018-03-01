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

    static checkIfPrime(n) {
        if (n === 0 || n === 1) {
            return false;
        }
        for (let i = 2; i <= Math.max(n / 2); i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }

    static findPrimeFactors(n) {
        const factors = [];
        for (let i = 2; i <= Math.max(n / 2); i++) {
            if (n % i === 0) {
                factors.push(i)
            }
        }
        if (this.checkIfPrime(n)) {
            factors.push(n);
        }
        return factors.filter(f => this.checkIfPrime(f));
    }

    static mergeSortedArrays(arr1, arr2) {
        const merged = [];

        let i1 = 0;
        let i2 = 0;

        while (i1 < arr1.length || i2 < arr2.length) {
            if (i1 >= arr1.length) {
                merged.push(arr2[i2]);
                i2++;
            }
            else if (i2 >= arr2.length) {
                merged.push(arr1[i1]);
                i1++;
            }
            else if (arr1[i1] > arr2[i2]) {
                merged.push(arr2[i2]);
                i2++;
            }
            else {
                merged.push(arr1[i1]);
                i1++;
            }
        }

        return merged;
    }

    static reverseStringRecursive(str) {
        if (!str || !str.length) {
            return '';
        }
        const result = this.reverseStringRecursive(str.substr(1)) + str.charAt(0);
        return result;
    }

    static reverseWordsInString(str) {
        return str.split(/\s+/).filter(it => it.trim().length > 0).map(it => it.trim()).reverse().join(' ');
    }

    static firstNonRepeatingCharacterInAString(str) {
        const charMap = {};

        for (let i = 0; i < str.length; i++) {
            const char = str.charAt(i);
            const typeofCharMapI = typeof(charMap[char]);
            if (typeofCharMapI === 'boolean' || typeofCharMapI === 'number') {
                charMap[char] = true;
            }
            else {
                charMap[char] = i;
            }
        }

        let lowestChar = null;
        let lowestIndex = Infinity;

        const keys = Object.keys(charMap);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const index = charMap[key];
            if (index === true) {
                // do nothing, because this char has been repeated
            }
            else {
                if (index < lowestIndex) {
                    lowestIndex = index;
                    lowestChar = str.charAt(index);
                }
            }
        }

        return {
            char: lowestChar,
            index: lowestIndex
        };
    }
}

module.exports = Practice;