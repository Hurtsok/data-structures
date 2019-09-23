const fs = require('fs');

const file = fs.readFileSync('./1-task/tree_height/tests/21', {encoding: 'utf8'});
let [nodes, nodeParents] = file.split('\n');

nodes = Number(nodes);
nodeParents = nodeParents.split(/\s/);

class Queue {

    constructor() {
        this.queue = [];
        this.offset = 0;
    }

    getLength() {
        return this.queue.length - this.offset;
    }

    isEmpty() {
        return (this.queue.length - this.offset) <= 0;
    }

    enqueue(item){
        this.queue.push(item);
    }

    dequeue() {
        if (this.isEmpty()) return undefined;

        const item = this.queue[this.offset];
        this.offset += 1;

        return item;
    }

    peek() {
        if (this.isEmpty()) return undefined;

        return this.queue[this.offset];
    }

}

function makeNode({value}) {
    return {
        value,
        children: [],
    }
}

function output(message) {
    console.log(message);

    process.exit();
}

function getTreeHeight(rootNode) {
    const tree = rootNode;
    const queue = new Queue();
    const height = new Queue();
    let lastDepth = 0;

    queue.enqueue(tree);
    height.enqueue(1);

    while(!queue.isEmpty()) {
        let node = queue.dequeue();
        let depth = height.dequeue();
        lastDepth = depth;

        for (let i = 0, len = node.children.length; i < len; i += 1) {
            queue.enqueue(node.children[i]);
            height.enqueue(depth + 1);
        }
    }

    return lastDepth;
}

/**
 * [0,1,2,3,4,5,6,7,8,9]
 * [9 7 5 5 2 9 9 9 2 -1]
 *
 *  {
 *      9: {
 *        children: {
 *            0: {},
 *            5: {
 *              children: {
 *                  2: {
 *                      children: {
 *                          4: {},
 *                          8: {}
 *                      }
 *                  },
 *                  3: {}
 *              }
 *            },
 *            6: {
 *
 *            }
 *            7: {
 *              children: {
 *                  1: {}
 *              }
 *            }
 *
 *        }
 *      }
 *  }
 *
 *  [{v: 9}, '|', {v: 0}, {v: 5}, {v: 6}, {v: 7}, '|', {v: 2}, {v: 3}, '|', {v: 1}, '|', {v: 4}, {v: 8}, '|']
 *
 */

function main() {
    const nodesList = [];
    let rootIndex;
    let i = nodes;
    let queue = [];

    while (--i >= 0) {
        nodesList[i] = makeNode({value: Number(i)});
    }

    nodeParents.forEach((value, index) => {
        if (Number(value) !== -1) {
            nodesList[value].children.push(nodesList[index]);
        } else {
            rootIndex = index;
        }
    });

    const h = getTreeHeight(nodesList[rootIndex]);
    output(h);
/*    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);

    console.log('inited queue', queue.queue);

    console.log('deque 1 - ', queue.dequeue());
    console.log('deque 2 - ', queue.dequeue());
    console.log(queue.offset);
    console.log('queue after deque -', queue.queue);

    queue.enqueue(5);
    queue.enqueue(6);

    console.log('queue after enqueue -', queue.queue);

    console.log('dequeue 3 - ', queue.dequeue());
    console.log('dequeue 4 - ', queue.dequeue());

    queue.dequeue();
    console.log(queue.queue);*/

}


main();

