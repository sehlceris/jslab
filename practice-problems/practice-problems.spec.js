const expect = require("chai").expect;
const Practice = require('./practice-problems');

describe('Practice', function () {
    describe('getIntsNotInArrayOfRange', function () {
        it('should return an array of ints that are missing from an array', function () {
            const max = 10;
            const testArr = [2, 5, 6, 8, 9];
            const expectedResult = [1, 3, 4, 7, 10];
            const actualResult = Practice.getIntsNotInArrayOfRange(testArr, max);
            expect(actualResult).to.eql(expectedResult);
        });
    });

    describe('removeElementsInListWithEvenNumberOfOccurrences', function () {
        it('should remove all elements in a list with an even number of occurrences', function () {
            const testArr = [0, 0, 1, 2, 2, 2, 2, 3, 3, 3, 4, 5, 5, 6, 6];
            const expectedResult = [1, 3, 4].sort();
            const actualResult = Practice.removeElementsInListWithEvenNumberOfOccurrences(testArr).sort();
            expect(actualResult).to.eql(expectedResult);
        });
    });

    describe('binarySearch', function () {
        it('should find element at index 0 for even length array', function () {
            const testArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            const actualResult = Practice.binarySearch(testArr, 0);
            expect(actualResult).to.eql(0);
        });

        it('should find element at index N-1 for even length array', function () {
            const testArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            const actualResult = Practice.binarySearch(testArr, testArr[testArr.length - 1]);
            expect(actualResult).to.eql(testArr[testArr.length - 1]);
        });

        it('should find element in even length array', function () {
            const testArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            const actualResult = Practice.binarySearch(testArr, 3);
            expect(actualResult).to.eql(3);
        });

        it('should return null if element not found in even length array', function () {
            const testArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            const actualResult = Practice.binarySearch(testArr, 99);
            expect(actualResult).to.eql(null);
        });

        it('should find element at index 0 for odd length array', function () {
            const testArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            const actualResult = Practice.binarySearch(testArr, 0);
            expect(actualResult).to.eql(0);
        });

        it('should find element at index N-1 for odd length array', function () {
            const testArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            const actualResult = Practice.binarySearch(testArr, testArr[testArr.length - 1]);
            expect(actualResult).to.eql(testArr[testArr.length - 1]);
        });

        it('should find element in odd length array', function () {
            const testArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            const actualResult = Practice.binarySearch(testArr, 3);
            expect(actualResult).to.eql(3);
        });

        it('should return null if element not found in odd length array', function () {
            const testArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            const actualResult = Practice.binarySearch(testArr, 99);
            expect(actualResult).to.eql(null);
        });

        it('should search zero length array', function () {
            const testArr = [];
            const actualResult = Practice.binarySearch(testArr, 99);
            expect(actualResult).to.eql(null);
        });

        it('should search length 1 array without finding a value', function () {
            const testArr = [0];
            const actualResult = Practice.binarySearch(testArr, 99);
            expect(actualResult).to.eql(null);
        });

        it('should search length 1 array and find a value', function () {
            const testArr = [0];
            const actualResult = Practice.binarySearch(testArr, 0);
            expect(actualResult).to.eql(0);
        });

        it('should search length 2 array without finding a value', function () {
            const testArr = [0, 1];
            const actualResult = Practice.binarySearch(testArr, 99);
            expect(actualResult).to.eql(null);
        });

        it('should search length 2 array and find a value', function () {
            const testArr = [0, 1];
            const actualResult = Practice.binarySearch(testArr, 0);
            expect(actualResult).to.eql(0);
        });
    });

    describe('checkIfPrime', function () {
        it('should verify that 0 is not prime', function () {
            expect(Practice.checkIfPrime(0)).to.be.false;
        });

        it('should verify that 1 is not prime', function () {
            expect(Practice.checkIfPrime(1)).to.be.false;
        });

        it('should verify that 2 is prime', function () {
            expect(Practice.checkIfPrime(2)).to.be.true;
        });

        it('should verify that 3 is prime', function () {
            expect(Practice.checkIfPrime(3)).to.be.true;
        });

        it('should verify that 4 is not prime', function () {
            expect(Practice.checkIfPrime(4)).to.be.false;
        });

        it('should verify that 5 is prime', function () {
            expect(Practice.checkIfPrime(5)).to.be.true;
        });

        it('should verify that 6 is not prime', function () {
            expect(Practice.checkIfPrime(6)).to.be.false;
        });

        it('should verify that 7 is prime', function () {
            expect(Practice.checkIfPrime(7)).to.be.true;
        });

        it('should verify that 28 is not prime', function () {
            expect(Practice.checkIfPrime(28)).to.be.false;
        });

        it('should verify that 29 is prime', function () {
            expect(Practice.checkIfPrime(29)).to.be.true;
        });
    });

    describe('findPrimeFactors', function () {

        it('finds no prime factors for 0', function () {
            expect(Practice.findPrimeFactors(0)).to.eql([]);
        });

        it('finds no prime factors for 1', function () {
            expect(Practice.findPrimeFactors(1)).to.eql([]);
        });

        it('finds a prime factor for 2', function () {
            expect(Practice.findPrimeFactors(2)).to.eql([2]);
        });

        it('finds a prime factor for 3', function () {
            expect(Practice.findPrimeFactors(3)).to.eql([3]);
        });

        it('finds prime factors for 8', function () {
            expect(Practice.findPrimeFactors(8)).to.eql([2]);
        });

        it('finds prime factors for 24', function () {
            expect(Practice.findPrimeFactors(24)).to.eql([2, 3]);
        });

        it('finds a prime factor for 29', function () {
            expect(Practice.findPrimeFactors(29)).to.eql([29]);
        });
    });

    describe('mergeSortedArrays', function () {

        it('merges two empty arrays', function () {
            expect(Practice.mergeSortedArrays([], [])).to.eql([]);
        });

        it('merges two arrays of length 1', function () {
            expect(Practice.mergeSortedArrays([1], [2])).to.eql([1, 2]);
        });

        it('merges two arrays of length 1 (reverse)', function () {
            expect(Practice.mergeSortedArrays([2], [1])).to.eql([1, 2]);
        });

        it('merges two sorted arrays into a sorted array', function () {
            const arr1 = [2, 5, 6, 9];
            const arr2 = [1, 2, 3, 29];
            const expectedResult = [1, 2, 2, 3, 5, 6, 9, 29];
            expect(Practice.mergeSortedArrays(arr1, arr2)).to.eql(expectedResult);
        });
    });

    describe('reverseStringRecursive', function () {

        it('reverses an string with even length', function () {
            const str = 'tineye';
            const expectedResult = 'eyenit';
            const actualResult = Practice.reverseStringRecursive(str);
            expect(actualResult).to.equal(expectedResult);
        });

        it('reverses an string with odd length', function () {
            const str = 'tiney';
            const expectedResult = 'yenit';
            const actualResult = Practice.reverseStringRecursive(str);
            expect(actualResult).to.equal(expectedResult);
        });

    });

    describe('reverseWordsInString', function () {

        it('reverses words in a string', function () {
            const str = 'hole in my bucket';
            const expectedResult = 'bucket my in hole';
            const actualResult = Practice.reverseWordsInString(str);
            expect(actualResult).to.equal(expectedResult);
        });

        it('reverses words in a string with leading, trailing, and multiple spaces', function () {
            const str = ' hole in  my      bucket  ';
            const expectedResult = 'bucket my in hole';
            const actualResult = Practice.reverseWordsInString(str);
            expect(actualResult).to.equal(expectedResult);
        });

        it('reverses words in a string', function () {
            const str = 'hole in my bucket delilah';
            const expectedResult = 'delilah bucket my in hole';
            const actualResult = Practice.reverseWordsInString(str);
            expect(actualResult).to.equal(expectedResult);
        });
    });

    describe('firstNonRepeatingCharacterInAString', function () {

        it('finds the first non repeating character in a string', function () {
            const str = 'a b c d e f g abcdfg h i j k';
            const expectedResult = {
                char: 'e',
                index: 8
            };
            const actualResult = Practice.firstNonRepeatingCharacterInAString(str);
            expect(actualResult).to.eql(expectedResult);
        })

    });

    describe('randomNumberBetween1And7', function () {

        it('returns numbers between 1 and 7 and averages 4', function () {
            const ITERATIONS_TO_TEST = 10;
            const ITERATIONS_TO_AVERAGE = 10000;
            const WIGGLE_ROOM = 0.1;
            const EXPECTED_AVERAGE = 4;
            const LOWEST = 1;
            const HIGHEST = 7;

            for (let j = 0; j < ITERATIONS_TO_TEST; j++) {
                let sum = 0;
                let lowestRand = Infinity;
                let highestRand = -1;

                for (let i = 0; i < ITERATIONS_TO_AVERAGE; i++) {
                    const rand = Practice.randomNumberBetween1And7();
                    if (rand > highestRand) {
                        highestRand = rand;
                    }
                    else if (rand < lowestRand) {
                        lowestRand = rand;
                    }
                    sum += rand;
                }
                const average = sum / ITERATIONS_TO_AVERAGE;
                expect(average).to.be.within(EXPECTED_AVERAGE - WIGGLE_ROOM, EXPECTED_AVERAGE + WIGGLE_ROOM);
                expect(lowestRand).not.to.be.lessThan(LOWEST);
                expect(highestRand).not.to.be.greaterThan(HIGHEST);
            }
        });
    });

    describe('countZeroesNaive', function () {

        it('counts zeroes between 0 and 99', function () {
            expect(Practice.countZeroesNaive(99)).to.equal(10);
        });

        it('counts zeroes between 0 and 999', function () {
            expect(Practice.countZeroesNaive(999)).to.equal(190);
        });

        it('counts zeroes between 0 and 2014', function () {
            expect(Practice.countZeroesNaive(2014)).to.equal(517);
        });

        it('counts zeroes between 0 and 5000', function () {
            expect(Practice.countZeroesNaive(5000)).to.equal(1393);
        });

        it('counts zeroes between 0 and 9999', function () {
            expect(Practice.countZeroesNaive(9999)).to.equal(2890);
        });

        it('counts zeroes between 0 and 99999', function () {
            expect(Practice.countZeroesNaive(99999)).to.equal(38890);
        });

        it('counts zeroes between 0 and 999999', function () {
            expect(Practice.countZeroesNaive(999999)).to.equal(488890);
        });
    });

    describe('incrementIntRepresentedAsArray', function () {

        it('will increment [0] to [1]', function () {
            expect(Practice.incrementIntRepresentedAsArray([0])).to.eql([1]);
        });

        it('will increment [2] to [3]', function () {
            expect(Practice.incrementIntRepresentedAsArray([2])).to.eql([3]);
        });

        it('will increment [1,2] to [1,3]', function () {
            expect(Practice.incrementIntRepresentedAsArray([1, 2])).to.eql([1, 3]);
        });

        it('will increment [9] to [1,0]', function () {
            expect(Practice.incrementIntRepresentedAsArray([9])).to.eql([1, 0]);
        });

        it('will increment [1,9] to [2,0]', function () {
            expect(Practice.incrementIntRepresentedAsArray([1, 9])).to.eql([2, 0]);
        });

        it('will increment [9,9,9] to [1,0,0,0]', function () {
            expect(Practice.incrementIntRepresentedAsArray([9, 9, 9])).to.eql([1, 0, 0, 0]);
        });

        it('will increment [-1] to [0]', function () {
            expect(Practice.incrementIntRepresentedAsArray([-1])).to.eql([0]);
        });

        it('will increment [-2] to [-1]', function () {
            expect(Practice.incrementIntRepresentedAsArray([-2])).to.eql([-1]);
        });

        it('will increment [-1,0] to [-9]', function () {
            expect(Practice.incrementIntRepresentedAsArray([-1, 0])).to.eql([-9]);
        });

        it('will increment [-1,0,0] to [-9,9]', function () {
            expect(Practice.incrementIntRepresentedAsArray([-1, 0, 0])).to.eql([-9, 9]);
        });
    });
});
