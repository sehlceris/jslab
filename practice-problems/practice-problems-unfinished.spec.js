const expect = require("chai").expect;
const PracticeUnfinished = require('./practice-problems-unfinished');

describe('Practice', function () {

    describe('countZeroes', function () {

        it('counts zeroes between 0 and 99', function () {
            expect(PracticeUnfinished.countZeroes(99)).to.equal(10);
        });

        it('counts zeroes between 0 and 999', function () {
            expect(PracticeUnfinished.countZeroes(999)).to.equal(190);
        });

        it('counts zeroes between 0 and 2014', function () {
            expect(PracticeUnfinished.countZeroes(2014)).to.equal(517);
        });

        it('counts zeroes between 0 and 5000', function () {
            expect(PracticeUnfinished.countZeroes(5000)).to.equal(1393);
        });

        it('counts zeroes between 0 and 9999', function () {
            expect(PracticeUnfinished.countZeroes(9999)).to.equal(2890);
        });

        it('counts zeroes between 0 and 99999', function () {
            expect(PracticeUnfinished.countZeroes(99999)).to.equal(38890);
        });

        it('counts zeroes between 0 and 999999', function () {
            expect(PracticeUnfinished.countZeroes(999999)).to.equal(488890);
        });
    });

    describe('deepEqual', function () {

        it('compares matching primitives', function () {
            const o1 = 'a';
            const o2 = 'a';
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.true;
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.true;
        });

        it('compares nonmatching primitives', function () {
            const o1 = 'a';
            const o2 = 'b';
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.false;
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.false;
        });

        it('compares matching arrays of primitives', function () {
            const o1 = ['a', 'b', 1, 2];
            const o2 = ['a', 'b', 1, 2];
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.true;
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.true;
        });

        it('compares nonmatching arrays of primitives', function () {
            const o1 = ['a', 'b', 1, 2];
            const o2 = ['a', 'c', 1, 2];
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.false;
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.false;
        });

        it('compares matching objects of primitives', function () {
            const o1 = {
                a: 1,
                b: 2,
                c: 3
            };
            const o2 = {
                a: 1,
                b: 2,
                c: 3
            };
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.true;
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.true;
        });

        it('compares nonmatching objects of primitives', function () {
            const o1 = {
                a: 1,
                b: 2,
                c: 3
            };
            const o2 = {
                a: 1,
                b: 2,
                c: 4
            };
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.false;
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.false;
        });

        it('compares matching arrays of arrays', function () {
            const o1 = [[1, 2], [2, 3], [3, 4]];
            const o2 = [[1, 2], [2, 3], [3, 4]];
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.true;
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.true;
        });

        it('compares nonmatching arrays of arrays', function () {
            const o1 = [[1, 2], [2, 3], [3, 4]];
            const o2 = [[1, 2], [2, 3], [3, 5]];
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.false;
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.false;
        });

        it('compares matching objects of objects', function () {
            const o1 = {
                a: {a: 1},
                b: {a: 1},
                c: {a: 1}
            };
            const o2 = {
                a: {a: 1},
                b: {a: 1},
                c: {a: 1}
            };
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.true;
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.true;
        });

        it('compares nonmatching objects of objects', function () {
            const o1 = {
                a: {a: 1},
                b: {a: 1},
                c: {a: 1}
            };
            const o2 = {
                a: {a: 1},
                b: {a: 1},
                c: {b: 1}
            };
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.false;
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.false;
        });

        it('compares matching maps', function () {
            const o1 = new Map();
            const o2 = new Map();
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.true;
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.true;

            o1.set('a', 1);
            o2.set('a', 1);
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.true;
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.true;
        });

        it('compares nonmatching maps', function () {
            const o1 = new Map();
            const o2 = new Map();

            o2.set('x', 'y');
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.false;

            o1.set('x', 'z');
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.false;
        });

        it('compares matching sets', function () {
            const o1 = new Set();
            const o2 = new Set();
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.true;
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.true;

            o1.add('a');
            o2.add('a');
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.true;
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.true;
        });

        it('compares nonmatching sets', function () {
            const o1 = new Set();
            const o2 = new Set();

            o2.add('x');
            expect(PracticeUnfinished.deepEqual(o1, o2)).to.be.false;

            o1.add('y');
            expect(PracticeUnfinished.deepEqual(o2, o1)).to.be.false;
        });
    });
});
