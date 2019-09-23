const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

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

function parseStr(str) {
    return str.split(/\s/);
}

function invariant(condition, message) {
    return !condition ? output(message) : true;
}

let lines = [];

rl.on('line', (input) => {
    invariant(Boolean(input), 'input cant be blank');

    lines.push(parseStr(input.trim()));

    if (lines.length === 2) {
        const nodesList = [];
        let [[nodesCount], orders] = lines;
        let rootIndex;

        while (--nodesCount >= 0) {
            nodesList[nodesCount] = makeNode({value: Number(nodesCount)});
        }

        orders.forEach((value, index) => {
            if (Number(value) !== -1) {
                nodesList[value].children.push(nodesList[index]);
            } else {
                rootIndex = index;
            }
        });

        output(getTreeHeight(nodesList[rootIndex]));
    }
});
