class ListNode {
    constructor(val) {
        this.val = val;
        this._next = null;
    }

    get next() {
        return this._next;
    }

    set next(next) {
        this._next = next;
    }

    join(separator = '') {
        let current = this;
        let val = '';
        while (current) {
            val += (separator + String(current.val));
            current = current.next;
        }
        return val;
    }

    /**
     * Converts a positive or zero integer to a LinkedList, with its digits in reverse order.
     * example: 1230 becomes 0->3->2->1
     * @param int
     * @returns {ListNode}
     */
    static createReverseLinkedListFromPositiveInteger(int) {
        const reversedArr = String(int).split('').reverse().map(n => Number.parseInt(n));
        const firstNode = new ListNode(reversedArr[0]);
        let prev = firstNode;
        for (let i = 1; i < reversedArr.length; i++) {
            const newNode = new ListNode(reversedArr[i]);
            prev.next = newNode;
            prev = newNode;
        }
        return firstNode;
    }

    /**
     * Converts a LinkedList representing a positive or zero integer into a positive number.
     * Reverse of createReverseLinkedListFromPositiveInteger.
     * @param firstNode
     * @returns {number}
     */
    static convertReversedLinkedListToPositiveInteger(firstNode) {
        return Number.parseInt(firstNode.join().split('').reverse().join(''));
    }
}

module.exports = {
    ListNode
};