const Practice = require('./practice-problems');

/**
 * This is a list of problems that I've given up on.
 */
class PracticeUnfinished {

    /**
     * For a sequential range of 0 - N, e.g. [0, 1, 2, ... 10, ... 20, ... 100, 101] count the number of zeros in all the numbers
     * @param n
     * @returns {number}
     */
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
                count += Practice.countZeroesNaive(remaining) - 1; // TODO: CHEATING!
                workingN = 0;
            } else {
                count += (level * 9 * Math.pow(10, level - 1));
                remaining -= workingN;
                workingN /= 10;
            }
        }

        return count;
    }

    /**
     * Deep equal.
     * @param a
     * @param b
     * @returns {boolean}
     */
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
}

module.exports = PracticeUnfinished;