export function capitalize(string) {
    if (typeof string !== 'string') {
        return '';
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getSelectedCells(start, end) {
    const diff = getId(start.$el.dataset.id, end);

    const arr = [];
    for (let i = diff.cols[0]; i <= diff.cols[1]; i++) {
        for (let j = diff.rows[0]; j <= diff.rows[1]; j++) {
            arr.push(`${i}:${j}`);
        }
    }
    return arr;
}

function getId(start, end) {
    const dataStart = start.split(':');
    const dataEnd = end.split(':');

    return {
        cols: [Math.min(dataStart[0], dataEnd[0]), Math.max(dataStart[0], dataEnd[0])],
        rows: [Math.min(dataStart[1], dataEnd[1]), Math.max(dataStart[1], dataEnd[1])]
    };
}