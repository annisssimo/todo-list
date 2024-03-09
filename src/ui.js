export class UI {
    static updateHeading(event) {
        const clickedTile = event.currentTarget;
        const tileText = clickedTile.querySelector('.tile-text');
        const heading = document.querySelector('h2');

        heading.textContent = tileText.textContent;
    }
}