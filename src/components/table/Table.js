import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from '@/components/table/table.resize';
import { TableSelection } from '@/components/table/TableSelection';
import { getSelectedCells } from '@core/utils';
import { getNextCell } from '@/components/table/table.function';
import { $ } from '@core/dom';


export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'click', 'keydown', 'input'],
            ...options
        });
    }

    toHTML() {
        return createTable(20);
    }

    prepare() {

    }

    init() {
        super.init();
        this.selection = new TableSelection();
        const $cell = this.$root.find('[data-id="1:1"]');
        this.selectCell($cell);

        this.$on('formula:input', text => {
            this.selection.current.text(text);
        });
        this.$on('formula:enter', text => {
            this.selection.current.focus();
        })
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:selectCell', $cell);
    }

    onClick(event) {
        if (event.target.dataset.id) {
            const $cell = this.$root.find(`[data-id="${event.target.dataset.id}"]`);
            if (event.shiftKey) {
                const cells = getSelectedCells(this.selection.current, $cell.$el.dataset.id)
                const cellsDom = cells.map(id => this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup(cellsDom);
            } else {
                this.selection.select($cell);
            }
        }
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            resizeHandler(event);
        }
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
        const {key} = event;

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            const id = this.selection.current.id(true);
            const $next = this.$root.find(getNextCell(key, id));
            this.selectCell($next);
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target));
    }
}

