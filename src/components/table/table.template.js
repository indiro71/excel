const CODES = {
    A: 65,
    Z: 90
}

function createCell(index, i) {
    return `
        <div class="cell" data-row="${i+1}" data-id="${i+1}:${index+1}" data-col="${toChar(index)}" contenteditable></div>
    `;
}

function createCol(col) {
    return `
        <div class="column" data-col="${col}" data-type="resizable">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function createRow(content, index) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div class="row" data-row="${index}" data-type="resizable">
            <div class="row-info" >
                ${index ? index : ''}
                ${resize}
            </div>
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