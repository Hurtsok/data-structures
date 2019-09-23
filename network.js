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

class Buffer extends Queue {
    constructor(size) {
        super();

        this.size = size;
    }

    enqueue(item) {
        if (this.getLength() < this.size) {
            super.enqueue(item);

            return true;
        }

        return false;
    }
}

class Request {
    constructor(start_time, finish_time) {
        this.start_time = start_time;
        this.finis_time= finish_time;
    }
}

class Response {
    constructor(response) {
        this.response = response;
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
    if (!input) {
        const [bufferSize, countPackets] = parseStr(lines[0]);
        const buffer = new Buffer(bufferSize);
        const queue = new Queue();

        for (let i = 1, len = lines.length; i < len; i += 1) {
            const [start_time, finish_time] = parseStr(lines[i]);
            const request = new Request(start_time, finish_time);

            if (!buffer.enqueue(request)) {
                queue.enqueue(new Response(-1));
            } else {

            }
        }

        output('end');
    }

    lines.push(input);
});
