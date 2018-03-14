const {ListNode} = require('./helpers');

class Practice {

    /**
     * Given an array of ints of size n with a domain from 1 to n where duplicates are allowed...
     * Write a method that returns all the eligible values that are not in the array.
     * example: getIntsNotInArrayOfRange([2,3,4,6,9], 10) -> [1,5,7,8,10]
     * @param arr
     * @param max
     * @param [min = 1]
     * @returns {*[]}
     */
    static getIntsNotInArrayOfRange(arr, max, min = 1) {
        const set = new Set(arr);
        const all = [];
        for (let i = min; i <= max; i++) {
            all.push(i);
        }
        return all.filter(i => !set.has(i));
    }

    /**
     * Remove all elements in the list that are repeated an even amount of times
     * example: [1,1,3,3,5,3,5] -> [3,3,3]
     * @param arr
     * @returns {*[]}
     */
    static removeElementsInListWithEvenNumberOfOccurrences(arr) {
        const counts = {};
        arr.forEach(i => counts[i] ? counts[i]++ : counts[i] = 1);
        return [... new Set(arr.filter(i => counts[i] % 2 !== 0))];
    }

    /**
     * Binary search a sorted array for an element and return its index, or null if it is not present in the array.
     * example: binarySearch([1,2,3,4,5,6,7], 3) -> 2
     * @param arr
     * @param el
     * @returns {number}
     */
    static binarySearch(arr, el) {
        if (!arr.length) {
            return null;
        }

        let currentMinIndex = 0;
        let currentMaxIndex = arr.length - 1;
        let currentTestIndex;
        let currentEl;

        while (currentMinIndex <= currentMaxIndex) {

            currentTestIndex = Math.floor((currentMinIndex + currentMaxIndex) / 2);

            currentEl = arr[currentTestIndex];

            if (el === currentEl) {
                return currentTestIndex;
            }
            else if (el > currentEl) {
                currentMinIndex = currentTestIndex + 1;
            }
            else if (el < currentEl) {
                currentMaxIndex = currentTestIndex - 1;
            }

        }
        return null;
    }

    /**
     * Check whether or not N is a prime number (no input validation required)
     * example: 0 -> false
     * example: 1 -> false
     * example: 2 -> true
     * example: 3 -> true
     * example: 4 -> false
     * @param n
     * @returns {boolean}
     */
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

    /**
     * Find the prime factors of N (a factor is a number that N can be divided by to produce an integer)
     * example: 0 -> []
     * example: 1 -> []
     * example: 2 -> [2]
     * example: 4 -> [2]
     * example: 10 -> [2, 5]
     * @param n
     * @returns {number[]}
     */
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

    /**
     * Merge two sorted arrays of numbers and return another sorted array
     * example: merge([5,6,7], [4,5,9]) => [4,5,5,6,7,9]
     * @param arr1
     * @param arr2
     * @returns {number[]}
     */
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

    /**
     * Reverse the characters in a string, recursively
     * @param str
     * @returns {string}
     */
    static reverseStringRecursive(str) {
        if (!str || !str.length) {
            return '';
        }
        const result = this.reverseStringRecursive(str.substr(1)) + str.charAt(0);
        return result;
    }

    /**
     * Reverse the words in a string. you may trim whitespace if necessary
     * @param str
     * @returns {string}
     */
    static reverseWordsInString(str) {
        return str.split(/\s+/).filter(it => it.trim().length > 0).map(it => it.trim()).reverse().join(' ');
    }

    /**
     * Find the first non-repeating character in a string, and return { char: (the char), index: (index it first appears at) }
     * You may assume capitalization counts as different characters.
     * example: "Aardvark" -> { char: 'd', index: 3 }
     * @param str
     * @returns {{char: string, index: number}}
     */
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

    /**
     * Given a rand5() function that generates random numbers between 1 and 5, utilize it to generate a random number between 1 and 7
     *
     * const rand5 = function () {
     *  return 1 + Math.random() * 4;
     * };
     *
     * @returns {number}
     */
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

    /**
     * For a sequential range of 0 - N, e.g. [0, 1, 2, ... 10, ... 20, ... 100, 101] count the number of zeros in all the numbers
     * examples: n=1: 0; n=99: 10; n=2014: 517
     * @param n - The last number in the range (inclusive)
     * @param start - The first number in the range (inclusive)
     * @returns {number}
     */
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

    /**
     * Given an integer array where each index contains a single digit of a large number, increment the number.
     * example: [7, 9, 9] -> [8, 0, 0]
     * example: [-1, 0, 0] -> [-9, 9]
     * @param {number[]} originalArr
     * @returns {number[]}
     */
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

    /**
     * Given an array of integers, return indices of the two numbers such that they add up to a specific target.
     * You may assume that each input would have exactly one solution, and you may not use the same element twice.
     *
     * example: twoSum([2, 7, 11, 9], 9) === [0, 1]
     * example: twoSum([2, 7, 11, 9], 18) === [1, 2]
     * example: twoSum([6, 7, 2, 5, 8], 12) === [1, 3]
     * example: twoSum([1, 2], 12) === null
     * example: twoSum([6, 1], 12) === null // you may not use the same element twice
     *
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    static twoSum(nums, target) {
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[j] + nums[i] === target) {
                    return [i, j];
                }
            }
        }
        return null;
    }

    /**
     * You are given two non-empty linked lists representing two non-negative integers.
     * The digits are stored in reverse order and each of their nodes contain a single digit.
     * Add the two numbers and return it as a linked list.
     * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
     *
     * example: adds [4,3,2] and [3,2,1] to [7,5,3] (234 + 123 = 357)
     * example: adds [3,2,1] and [1] to [4,2,1] (123 + 1 = 124)
     * example: adds [3,2,1] and [0] to [3,2,1] (123 + 0 = 123)
     * example: adds [7,6,5] and [8,7,3] to [5,4,9] (567 + 378 = 945)
     * example: adds [7,6,5] and [8,7,5] to [5,4,1,1]  (567 + 578 = 1145)
     *
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     *
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    static addTwoPositiveNumbersRepresentedByLinkedList(l1, l2) {
        let carry = false;
        let firstNode;
        let currentNode;
        let currentNodeL1 = l1;
        let currentNodeL2 = l2;
        while (currentNodeL1 || currentNodeL2) {
            let newVal = carry ? 1 : 0;
            carry = false;
            if (currentNodeL1) {
                newVal += currentNodeL1.val;
                currentNodeL1 = currentNodeL1.next;
            }
            if (currentNodeL2) {
                newVal += currentNodeL2.val;
                currentNodeL2 = currentNodeL2.next;
            }
            if (newVal >= 10) {
                carry = true;
                newVal -= 10;
            }
            const newNode = new ListNode(newVal);
            if (currentNode) {
                currentNode.next = newNode;
            }
            if (!firstNode) {
                firstNode = newNode;
            }
            currentNode = newNode;
        }
        if (carry) {
            currentNode.next = new ListNode(1);
        }
        return firstNode;
    }
}

module.exports = Practice;