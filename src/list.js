import {UI} from './ui.js';

export class List {
    constructor(heading, color) {
        this.heading = heading;
        this.color = color;
        this.tasks = [];
    }

    chooseList(event) {
        const clickedList = event.currentTarget;
        const text = clickedList.querySelector('.text');
        const heading = document.querySelector('h2');
    

        UI.updateHeading(heading, text);
        UI.changeListColor(clickedList);
    }    
}
