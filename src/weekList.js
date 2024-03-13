import { List } from './list.js';

class WeekList extends List {
    constructor() {
        super('Weekly', 'var(--blue)');
    }
    
    // Дополнительные методы и свойства специфичные для списка "Еженедельно"
}

const weekList = new WeekList();

export { weekList };
