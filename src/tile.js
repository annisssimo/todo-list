import {UI} from './ui.js';

export class Tile {
    constructor(heading, color) {
        this.heading = heading;
        this.color = color;
        this.tasks = [];
    }

    chooseTile(event) {
        const clickedTile = event.currentTarget;
        const tileText = clickedTile.querySelector('.tile-text');
        const heading = document.querySelector('h2');

        UI.updateHeading(heading, tileText);
        UI.changeTileColor(clickedTile);
    }
}