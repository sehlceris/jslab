const expect = require("chai").expect;
const Practice = require('./alex-interview');

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

    describe('swapNumbersWithoutTempElement', function () {
        it('should swap 3 and 76', function () {
            expect(Practice.swapNumbersWithoutTempElement(3, 76)).to.eql([76, 3]);
        });

        it('should swap 0 and 1', function () {
            expect(Practice.swapNumbersWithoutTempElement(0, 1)).to.eql([1, 0]);
        });
    });
});
