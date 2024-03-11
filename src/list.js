import {UI} from './ui.js';

class List {
    constructor(heading, color) {
        this.heading = heading;
        this.color = color;
        this.tasks = [];
    }

    chooseList(event) {
        const clickedList = event.currentTarget;
        const text = clickedList.querySelector('.text');
        const heading = document.querySelector('h2');
    
        if (heading) {
            UI.updateHeading(heading, tileText);
            UI.changeListColor(clickedList);
        }
    
        if (clickedList.classList.contains('list-item')) {
            const listName = clickedList.querySelector('.tile-text').textContent;
            if (heading) {
                UI.updateHeading(heading, listName);
            }
        }
    }    
}

const todayList = new List('Today', 'var(--blue)');
const weekList = new List('Weekly', 'var(--blue)');
const allList = new List('All', 'var(--blue)');
const importantList = new List('Important', 'var(--blue)');

export { List, todayList, weekList, allList, importantList };