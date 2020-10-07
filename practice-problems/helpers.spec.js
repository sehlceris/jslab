const expect = require("chai").expect;
const {ListNode, BinaryTree} = require('./helpers');

describe('Helpers', function () {
  describe('ListNode', function () {

    it('should be able to be constructed', function () {
      const node = new ListNode(1);
      expect(node).to.exist;
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

    it('should be constructed with a prev property of null', function () {
      const node = new ListNode(1);
      expect(node.prev).to.equal(null);
    });

    it('should allow assigning of its prev property', function () {
      const node1 = new ListNode(1);
      const node2 = new ListNode(2);
      node1.prev = node2;
      expect(node1.prev).to.equal(node2);
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

  describe('BinaryTree', function () {

    it('should be able to be constructed', function () {
      const tree = new BinaryTree(1);
      expect(tree).to.exist;
    });

    it('should allow reading of its value', function () {
      const tree = new BinaryTree(1);
      expect(tree.val).to.equal(1);
    });

    it('should be able to set and get its left tree', function () {
      const tree = new BinaryTree(1);
      const left = new BinaryTree(0);
      expect(tree.left).to.be.null;
      tree.left = left;
      expect(tree.left).to.equal(left);
    });

    it('should be able to set and get its right tree', function () {
      const tree = new BinaryTree(1);
      const right = new BinaryTree(2);
      expect(tree.right).to.be.null;
      tree.right = right;
      expect(tree.right).to.equal(right);
    });

  });
});
