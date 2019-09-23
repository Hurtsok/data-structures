const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

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

class BinaryHeapMin {
    constructor(arr) {
        let len = arr.length;
        let constraint = Math.floor(len / 2);

        this.heap = [...arr];
        this.swapsLog = [];

        for (let i = constraint; i >= 0 ; i -= 1) {
            this.siftDown(i);
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

    insert(node) {
        let len = this.heap.length;

        this.heap[len] = node;
        this.siftUp(len);
    }

    siftUp(i) {
        while(i >= 0 && this.heap[this.getParent(i)] > this.heap[i]) {
            let iParent = this.getParent(i);
            let parent = this.heap[iParent];

            this.heap[iParent] = this.heap[i];
            this.heap[i] = parent;

            i = iParent;
        }
    }

    siftDown(i) {
        let len = this.heap.length - 1;

        while(this.getLeftIndex(i) <= len) {
            let iLeft = this.getLeftIndex(i);
            let iRight = this.getRightIndex(i);
            let smallest = i;

            if (iLeft <= len && this.heap[iLeft] < this.heap[smallest]) {
                smallest = iLeft;
            }

            if (iRight <= len && this.heap[iRight] < this.heap[smallest]) {
                smallest = iRight;
            }

            if (i !== smallest) {
                let current = this.heap[i];

                this.heap[i] = this.heap[smallest];
                this.heap[smallest] = current;

                this.swapsLog.push(`${i} ${smallest}`);

                i = smallest;
            } else {
                i = iLeft;
            }
        }
    }

}

const lines = [];

rl.on('line', (input) => {
    invariant(Boolean(input), 'input cant be blank');

    lines.push(parseStr(input.trim()));

    if (lines.length === 2) {
        let [n, arr] = lines;
        let validData = [];

        n = Number(n);

        for(let i = 0; i < n; i += 1) {
            validData[i] = Number(arr[i]);
        }

        const heap = new BinaryHeapMin(validData);

        console.log(heap.swapsLog.length);

        if (heap.swapsLog.length > 0) {
            console.log(heap.swapsLog.join('\n'));
        }

        process.exit()
    }
});
