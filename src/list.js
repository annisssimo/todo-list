import {UI} from './ui.js';

export class List {
    constructor(heading, color) {
        this.heading = heading;
        this.color = color;
        this.tasks = [];
    }

    chooseList(event) {
        const clickedList = event.currentTarget;
    
        UI.resetTilesColors();
        UI.updateHeading(clickedList);
        UI.changeListColor(clickedList);
    }

    addTask(task) {
        this.tasks.push(task);
    }
}
