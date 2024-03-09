import {UI} from './ui.js';

export class Tile {
    constructor(heading, numberOfTasks) {
        this.heading = heading;
        this.numberOfTasks = numberOfTasks;
    }

    chooseTile(event) {
        const clickedTile = event.currentTarget;
        const tileText = clickedTile.querySelector('.tile-text');
        const heading = document.querySelector('h2');

        UI.updateHeading(heading, tileText);
        UI.changeTileColor(clickedTile);
    }
}