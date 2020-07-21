export function resizeHandler(event) {
    const resizer = event.target;
    const parentResizer = resizer.closest('[data-type="resizable"]');
    const cellWidth = parentResizer.getBoundingClientRect().width;
    const cellHeight = parentResizer.getBoundingClientRect().height;
    const xStart = event.clientX;
    const yStart = event.clientY;
    const resizeCol = document.querySelectorAll(`[data-col="${parentResizer.dataset.col}"]`);
    let xss;
    let yss;

    document.onmousemove = e => {
        xss = cellWidth + (e.clientX - xStart);
        yss = cellHeight + (e.clientY - yStart);

        if (resizer.dataset.resize == 'col') {
            parentResizer.style.width = `${xss}px`;
        }

        if (resizer.dataset.resize == 'row') {
            parentResizer.style.height = `${yss}px`;
        }
    }

    document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;

        if (resizer.dataset.resize == 'col') {
            for (const cell of resizeCol) {
                cell.style.width = `${xss}px`;
            }
        }
    }
}