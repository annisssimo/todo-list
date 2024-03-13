import { List } from './list.js';

class ImportantList extends List {
    constructor() {
        super('Important', 'var(--orange)');
    }
    
    // Дополнительные методы и свойства специфичные для списка "Сегодня"
}

const importantList = new ImportantList();

export { importantList };
