const fs = require('fs');

const file = fs.readFileSync('./tasks/job_queue/tests/02', {encoding: 'utf8'});
let [line1, line2] = file.split('\n');

function parseStr(str) {
    return str.split(/\s/);
}

function invariant(condition, message) {
    return !condition ? output(message) : true;
}

function output(message) {
    console.log(message);

    process.exit();
}

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

        if (this.offset * 2 > this.queue.length) {
            this.queue = this.queue.slice(this.offset);
            this.offset = 0;
        }

        const item = this.queue[this.offset];
        this.offset += 1;

        return item;
    }

    peek() {
        if (this.isEmpty()) return undefined;

        return this.queue[this.offset];
    }

}

class BinaryHeapMin {
    constructor(arr) {
        this.heap = [];

        if (arr && arr.length > 0) {
            let len = arr.length;
            let constraint = Math.floor(len / 2);

            this.heap = [...arr];

            for (let i = constraint; i >= 0 ; i -= 1) {
                this.siftDown(i);
            }
        }
    }

    getLeftIndex(i) {
        return 2 * i + 1;
    }

    getRightIndex(i) {
        return 2 * i + 2;
    }

    getParent(i) {
        return Math.floor((i - 1) / 2);
    }

    extractMin() {
        let item = this.heap[0];
        let last = this.heap.pop();

        if (this.isEmpty()) {
            return item;
        }

        this.heap[0] = last;
        this.siftDown(0);

        return item;


    }

    getMin() {
        return this.heap[0];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    insert(node) {
        let len = this.heap.length;

        this.heap[len] = node;
        this.siftUp(len);
    }

    compare(node1, node2) {
        if (node1.elapsedTime !== node2.elapsedTime) {
            return node1.elapsedTime < node2.elapsedTime;
        } else {
            return node1.id < node2.id;
        }
    }

    siftUp(i) {
        while(this.getParent(i) >= 0 && this.compare(this.heap[i], this.heap[this.getParent(i)])) {
            let iParent = this.getParent(i);
            let parent = this.heap[iParent];

            this.heap[iParent] = this.heap[i];
            this.heap[i] = parent;

            i = iParent;
        }
    }

    changePriority(i, priority) {
        const oldPriority = this.heap[i].elapsedTime;

        this.heap[i].elapsedTime = priority;

        if (priority < oldPriority) {
            this.siftUp(i);
        } else {
            this.siftDown(i);
        }
    }

    siftDown(i) {
        let len = this.heap.length - 1;

        while(this.getLeftIndex(i) <= len) {
            let iLeft = this.getLeftIndex(i);
            let iRight = this.getRightIndex(i);
            let smallest = i;

            if (iLeft <= len && this.compare(this.heap[iLeft], this.heap[smallest])) {
                smallest = iLeft;
            }

            if (iRight <= len && this.compare(this.heap[iRight], this.heap[smallest])) {
                smallest = iRight;
            }

            if (i !== smallest) {
                let current = this.heap[i];

                this.heap[i] = this.heap[smallest];
                this.heap[smallest] = current;

                i = smallest;
            } else {
                i = iLeft;
            }
        }
    }
}

const lines = [];

function main() {
    lines.push(parseStr(line1.trim()));
    lines.push(parseStr(line2.trim()));

    const workers = [];
    const jobs = new Queue();
    let [n, m] = lines[0];

    // make threads
    for(let i = 0; i < n; i +=1) {
        workers.push({id: i, elapsedTime: BigInt(0)});
    }

    // make jobs
    for (let i = 0; i < m; i += 1) {
        jobs.enqueue(BigInt(lines[1][i]));
    }

    const priorityQueue = new BinaryHeapMin(workers);
    const result = [];

    while(!jobs.isEmpty()) {
        const worker = priorityQueue.getMin();

        result.push(`${worker.id} ${worker.elapsedTime.toString()}`);
        priorityQueue.changePriority(0, worker.elapsedTime + jobs.dequeue());
    }

    /*while(!jobs.isEmpty()) {
        debugger;
        if (!workers.isEmpty())     {
            const worker = workers.dequeue();

            result.push(`${worker.id} ${worker.elapsedTime}`);

            worker.elapsedTime += jobs.dequeue();
            priorityQueue.insert(worker);

        } else {
            const w = priorityQueue.extractMin();

            workers.enqueue(w);

        }
    }*/

    fs.writeFileSync('./test', result.join('\n'));

    process.exit();
};

main();
