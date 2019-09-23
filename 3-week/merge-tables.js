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

/*function toNumber(arr) {
    return arr.map(Number);
}*/
function getMax(arr) {
    return arr.reduce((acc, item) => Number(item) > acc ? Number(item) : acc, 0);
}

class Table {
    constructor(countRows, i) {
        this.parent = this;
        this.rank = 0;
        this.i = i;
        this.size = Number(countRows);
    }

    addRows(rowsLen) {
        this.size += rowsLen;
    }

    clearRows() {
        this.size = 0;
    }
}

class DisjoinSet {
    static union(indexT1, indexT2) {
        const p1 = DisjoinSet.find(indexT1);
        const p2 = DisjoinSet.find(indexT2);

        if (p1 === p2) {
            return;
        }

        if (p1.rank > p2.rank) {
            p1.addRows(p2.size);
            p2.parent = p1;
            p2.clearRows();

            return p1;
        } else {
            p2.addRows(p1.size);
            p1.parent = p2;
            p1.clearRows();

            if (p2.rank === p1.rank) {
                p2.rank += 1;
            }

            return p2;
        }
    }

    static find(table) {
        let t = table;
        let parent = t.parent;
        const children = [parent];

        /*if(table !== table.parent) {
            table.parent = this.find(table.parent);
        }*/

        while(t !== parent) {
            children.push(t);
            t = parent;
            parent = t.parent;
        }

        for(let i = 0, len = children.length; i < len; i += 1) {
            children[i].parent = parent;
        }

        return t.parent;
    }
}

const lines = [];
const operations = [];

rl.on('line', (input) => {
    invariant(Boolean(input), 'input cant be blank');

    lines.push(parseStr(input.trim()));

    let cRows = 0;

    if (lines.length > 2) {
        let nTables = Number(lines[0][0]);
        let nMerges = Number(lines[0][1]);
        let cRows = lines[1];
        let maxSize = 0;
        const result = [];
        
        operations.push(lines[lines.length - 1]);

        if (operations.length === nMerges) {
            const tables = [];

            for(let i = 0, len = cRows.length; i < nTables; i += 1) {
                const table = new Table(cRows[i], i);

                if (maxSize < table.size) {
                    maxSize = table.size;
                }

                tables.push(table);
            }

            for (let i = 0; i < nMerges; i += 1) {

                const t1 = Number(operations[i][0]);
                const t2 = Number(operations[i][1]);

                const table = DisjoinSet.union(tables[t1 - 1], tables[t2 - 1]);


                if (table && maxSize < table.size) {
                    maxSize = table.size;
                }

                result.push(maxSize);
            }

            //debugger;
            console.log(result.join('\n'));
            process.exit();
        }
    }

});
