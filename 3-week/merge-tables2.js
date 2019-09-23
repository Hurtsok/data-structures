const fs = require('fs');

const file = fs.readFileSync('./tasks/merging_tables/tests/116', {encoding: 'utf8'});
const readeData = file.split('\n');

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

function toNumber(arr) {
    return arr.map(Number);
}

class Table {
    constructor(countRows, i) {
        this.parent = this;
        this.rank = 0;
        this.i = i;
        this.size = Number(countRows);
    }

    addRows(countRows) {
        this.size += countRows;
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

function main() {
    const line1 = parseStr(readeData[0].trim());
    const line2 = parseStr(readeData[1].trim());

    let nTables = Number(line1[0]);
    let nMerges = Number(line1[0]);
    let cRows = toNumber(line2);
    let maxSize = 0;
    let line = lines[2];
    const result = [];

    for (let i = 2; i < readeData.length; i += 1) {
        operations.push(toNumber(parseStr(readeData[i].trim())));
    }

    const tables = [];

    for(let i = 0, len = cRows.length; i < nTables; i += 1) {
        const table = new Table(cRows[i], i);

        if (maxSize < table.size) {
            maxSize = table.size;
        }

        tables.push(table);
    }

    for (let i = 0; i < nMerges; i += 1) {
        const t1 = operations[i][0];
        const t2 = operations[i][1];
        const table = DisjoinSet.union(tables[t1 - 1], tables[t2 - 1]);

        if (table && maxSize < table.size) {
            maxSize = table.size;
        }

        result.push(maxSize);
    }


    fs.writeFileSync('./test', result.join('\n'));

    process.exit();
};

main();
