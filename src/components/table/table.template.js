const CODES = {
    A: 65,
    Z: 90
}

function createCell(index, i) {
    return `
        <div class="cell" contenteditable>${toChar(index)}${i+1}</div>
    `;
}

function createCol(col) {
    return `
        <div class="column">${col}</div>
    `;
}

function createRow(content, index) {
    return `
        <div class="row">
            <div class="row-info">${index ? index : ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toChar(index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount).fill('').map((el, index) => {
       return createCol(toChar(index));
    }).join('');

    rows.push(createRow(cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount).fill('').map((el, index) => createCell(index, i)).join('');
        rows.push(createRow(cells, i+1));
    }

    return rows.join('');
}