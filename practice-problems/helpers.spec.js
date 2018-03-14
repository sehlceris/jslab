const expect = require("chai").expect;
const {ListNode} = require('./helpers');

describe('Helpers', function () {
    describe('ListNode', function () {

        it('should be able to be constructed', function () {
            const node = new ListNode(1);
        });

        it('should return its val property', function () {
            const node = new ListNode(1);
            expect(node.val).to.equal(1);
        });

        it('should allow setting of its val property', function () {
            const node = new ListNode(1);
            expect(node.val).to.equal(1);
            node.val = 2;
            expect(node.val).to.equal(2);
        });

        it('should be constructed with a next property of null', function () {
            const node = new ListNode(1);
            expect(node.next).to.equal(null);
        });

        it('should allow assigning of its next property', function () {
            const node1 = new ListNode(1);
            const node2 = new ListNode(2);
            node1.next = node2;
            expect(node1.next).to.equal(node2);
        });

        it('should allow joining of elements in the list into a string', function () {
            const node1 = new ListNode(1);
            const node2 = new ListNode(2);
            const node3 = new ListNode(3);

            node1.next = node2;
            node2.next = node3;

            expect(node1.join()).to.eql('123');
        });

        describe('createReverseLinkedListFromPositiveInteger', function () {
            it('converts 1230 to 0->3->2->1', function () {
                const firstNode = ListNode.createReverseLinkedListFromPositiveInteger(1230);
                expect(firstNode.val).to.equal(0);
                expect(firstNode.next.val).to.equal(3);
                expect(firstNode.next.next.val).to.equal(2);
                expect(firstNode.next.next.next.val).to.equal(1);
                expect(firstNode.next.next.next.next).to.be.null;
            });

            it('converts 0 to 0', function () {
                const firstNode = ListNode.createReverseLinkedListFromPositiveInteger(0);
                expect(firstNode.val).to.equal(0);
                expect(firstNode.next).to.be.null;
            });
        });

        describe('convertReversedLinkedListToPositiveInteger', function () {
            it('converts 0->3->2->1 to 1230', function () {
                const n = 1230;
                const firstNode = ListNode.createReverseLinkedListFromPositiveInteger(n);
                expect(ListNode.convertReversedLinkedListToPositiveInteger(firstNode)).to.equal(n);
            });

            it('converts 0 to 0', function () {
                const n = 0;
                const firstNode = ListNode.createReverseLinkedListFromPositiveInteger(n);
                expect(ListNode.convertReversedLinkedListToPositiveInteger(firstNode)).to.equal(n);
            });
        });
    });
});
