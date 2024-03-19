import {UI} from './ui';
import todo from './todo';

export class List {
    constructor(heading, color) {
        this.heading = heading;
        this.color = color;
        this.tasks = [];
    }

    chooseList(event) {
        const clickedList = event.currentTarget;
        const listHeading = clickedList.querySelector('.text').textContent;
        const list = todo.lists.find(obj => obj.heading === listHeading);
    
        UI.resetTilesColors();
        UI.updateHeading(clickedList);
        UI.changeListColor(clickedList);
        UI.updateTaskListInMainContent(list);
    }

    addTask(task) {
        this.tasks.push(task);
    }
}
