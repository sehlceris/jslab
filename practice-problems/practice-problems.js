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

    // check whether or not N is a prime number (no input validation required)
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

    // find the prime factors of N (a factor is a number that N can be divided by to produce an integer)
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

    // merge two sorted arrays and return another sorted array
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

    // reverse the characters in a string, recursively
    static reverseStringRecursive(str) {
        if (!str || !str.length) {
            return '';
        }
        const result = this.reverseStringRecursive(str.substr(1)) + str.charAt(0);
        return result;
    }

    // reverse the words in a string. you may trim whitespace if necessary
    static reverseWordsInString(str) {
        return str.split(/\s+/).filter(it => it.trim().length > 0).map(it => it.trim()).reverse().join(' ');
    }

    // find the first non-repeating character in a string, and return { char: (the char), index: (index it first appears at) }
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
    // a truly random distribution will average 4 over time
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

    // for a sequential range of 0 - N, e.g. [0, 1, 2, ... 10, ... 20, ... 100, 101] count the number of zeros in all the numbers
    // examples: n=1: 0; n=99: 10; n=2014: 517
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

    // given an integer array where each index contains a single digit of a large number, increment the number.
    // example: [7, 9, 9] -> [8, 0, 0]
    // example: [-1, 0, 0] -> [-9, 9]
    static incrementIntRepresentedAsArray(originalArr) {
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