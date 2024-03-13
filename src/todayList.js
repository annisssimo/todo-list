import { List } from './list.js';

class TodayList extends List {
    constructor() {
        super('Today', 'var(--blue)');
    }
    
    // Дополнительные методы и свойства специфичные для списка "Сегодня"
}

const todayList = new TodayList();

export { todayList };
