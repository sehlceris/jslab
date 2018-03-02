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

    // given a rand5() function that generates random numbers between 1 and 5, utilize it to generate a random number between 1 and 7
    static randomNumberBetween1And7() {
        const rand5 = function () {
            return 1 + Math.random() * 4;
        };
        const rands = [];
        for (let i = 0; i < 6; i++) {
            rands.push(rand5());
        }
        let indexOfLowestRand = 0;
        let lowestRand = rands[0];
        for (let i = 1; i < rands.length; i++) {
            if (rands[i] < lowestRand) {
                lowestRand = rands[i];
                indexOfLowestRand = i;
            }
        }
        const randomIntBetween1And6 = indexOfLowestRand + 1;
        const randBetween0And1 = ((rand5() - 1) / 4);

        return randomIntBetween1And6 + randBetween0And1;
    }

    //for a sequential range of 0 - N, e.g. [0, 1, 2, ... 10, ... 20, ... 100, 101] count the number of zeros in all the numbers
    static countZeroesNaive(n, start = 0) {
        const numsWithZero = [];
        for (let i = start; i <= n; i++) {
            const str = String(i);
            if (str.indexOf('0') > -1) {
                numsWithZero.push(i);
            }
        }

        const zeroCount = numsWithZero.reduce((acc, it) => {
            const str = String(it);
            const zeroes = str.split('').filter(char => char === '0').length;
            return acc + zeroes;
        }, 0);

        return zeroCount;
    }

    // for a sequential range of 0 - N, e.g. [0, 1, 2, ... 10, ... 20, ... 100, 101] count the number of zeros in all the numbers
    // TODO: Is this too difficult to find a shortcut for...? I got tired of trying and gave up!
    static countZeroes(n) {

        /**
         *     1 -   99 =   10 = 1 * 9 * 10
         *   100 -  199 =   20 = 2 * 10
         *   100 -  999 =  180 = 2 * 9 * 10
         *  1000 - 1999 =  300 = 3 * 100
         *  1000 - 9999 = 2700 = 3 * 9 * 100
         */

        let remaining = n;
        let workingN = n;
        let count = 1;
        while (workingN > 10) {

            let level = Math.floor(Math.log10(workingN));
            let maxAtThisLevel = Math.pow(10, level + 1) - 1;

            if (workingN < maxAtThisLevel) {
                remaining = workingN;
                count += this.countZeroesNaive(remaining) - 1; // TODO: CHEATING!
                workingN = 0;
            } else {
                count += (level * 9 * Math.pow(10, level - 1));
                remaining -= workingN;
                workingN /= 10;
            }
        }

        return count;
    }

    // deep equal. WAY TOO HARD! I abandoned this midway.
    static deepEqual(a, b) {
        if (a === b || (a === NaN && b === NaN)) {
            return true;
        }

        if (a instanceof Array || b instanceof Array) {
            if (!(a instanceof Array) || !(b instanceof Array)) {
                return false;
            }
            else if (a.length !== b.length) {
                return false;
            }
            else {
                for (let i = 0; i < a.length; i++) {
                    if (!this.deepEqual(a[i], b[i])) {
                        return false;
                    }
                }
                return true;
            }
        }
        else if (typeof(a) === 'object' && typeof(b) === 'object') {
            let mismatch = false;

            if (a instanceof Map || b instanceof Map) {
                if (!(a instanceof Map) || !(b instanceof Map)) {
                    mismatch = true;
                }
                else if (a.size !== b.size) {
                    mismatch = true;
                }
                else {
                    const keys = a.keys();
                    for (let key of keys) {
                        if (!this.deepEqual(a.get(key), b.get(key))) {
                            mismatch = true;
                        }
                    }
                }
            }
            else if (a instanceof Set || b instanceof Set) {
                if (!(a instanceof Set) || !(b instanceof Set)) {
                    mismatch = true;
                }
                else if (a.size !== b.size) {
                    mismatch = true;
                }
                else {
                    for (const el of a) {
                        if (!b.has(el)) {
                            mismatch = true;
                        }
                    }
                }
            }
            else if (a instanceof Buffer || b instanceof Buffer) {
                // TODO: along with others! This is WAY too hard!
            }
            else {
                // the default object behavior
                for (let key in a) {
                    if (!this.deepEqual(a[key], b[key])) {
                        mismatch = true;
                    }
                }
            }

            return !mismatch;
        }

        return false;
    }

    // given an integer array where each index contains a single digit of a large number, increment the number.
    // for example, if the array contains [9,9] then return an array that contains [1,0,0]
    static incrementIntRepresentedAsArray(originalArr) {
        // assume arr = [7, 9, 9] - output should be [8, 0, 0]
        // assume arr = [-1, 0, 0] - output should be [-9, 9]
        const arr = [...originalArr];
        const negative = arr[0] < 0;
        if (!negative) {
            // positive
            for (let i = arr.length - 1; i >= 0; i--) {
                if (arr[i] === 9) {
                    arr[i] = 0;
                    if (i === 0) {
                        arr.unshift(1);
                    }
                }
                else {
                    arr[i] = arr[i] + 1;
                    break;
                }
            }
        }
        else {
            // negative
            if (arr.length === 1) {
                arr[0] = arr[0] + 1;
            }
            else {
                for (let i = arr.length - 1; i >= 0; i--) {
                    if (i === 0) {
                        if (arr[i] === -1) {
                            arr.shift();
                            arr[0] = -arr[0];
                        }
                        else {
                            arr[i] = arr[i] + 1;
                        }
                    }
                    else {
                        if (arr[i] === 0) {
                            arr[i] = 9;
                        }
                        else {
                            arr[i] = arr[i] - 1;
                            break;
                        }
                    }

                }
            }
        }
        return arr;
    }
}

module.exports = Practice;