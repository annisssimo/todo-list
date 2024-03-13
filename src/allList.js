import { List } from './list.js';

class AllList extends List {
    constructor() {
        super('All', 'var(--gray)');
    }
    
    // Дополнительные методы и свойства специфичные для списка "Сегодня"
}

const allList = new AllList();

export { allList };
