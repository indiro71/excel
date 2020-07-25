export class TableSelection {
    static activeClass = 'selected';

    constructor() {
        this.group = [];
        this.current = null;
    }

    select($el) {
        this.remove();
        this.group.push($el);
        $el.focus();
        this.active();
        this.current = $el;
    }

    selectGroup($group) {
        this.remove();
        this.group = $group;
        this.active();
    }

    active() {
        this.group.map($elem => $elem.addClass(TableSelection.activeClass));
    }

    remove() {
        this.group.map($elem => $elem.removeClass(TableSelection.activeClass));
        this.group = [];
    }
}