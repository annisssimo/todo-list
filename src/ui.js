export class UI {

    static updateHeading(heading, tileText) {
        heading.textContent = tileText.textContent;
    }

    static resetTilesColors() {
        const allTiles = document.querySelectorAll('.tile');
        allTiles.forEach(tile => {
            tile.classList.remove('today-tile-clicked', 'week-tile-clicked', 'all-tile-clicked', 'important-tile-clicked');

            const tileIcon = tile.querySelector('.material-symbols-outlined');
            const tileDigit = tile.querySelector('.digit');

            tileIcon.style.background = '';
            tileIcon.style.color = 'white';
            tileDigit.style.color = '';
        });
    }

    static changeTileColor(clickedTile) {
        UI.resetTilesColors();

        clickedTile.classList.add(`${clickedTile.id}-tile-clicked`);

        const tileIcon = clickedTile.querySelector('.material-symbols-outlined');
        const tileDigit = clickedTile.querySelector('.digit');

        tileIcon.style.background = 'white';
        tileDigit.style.color = 'white';

        switch (clickedTile.id) {
            case 'today':
                tileIcon.style.color = 'var(--blue)';
                break;
            case 'week':
                tileIcon.style.color = 'var(--red)';
                break;
            case 'all':
                tileIcon.style.color = 'var(--dark-gray)';
                break;
            case 'important':
                tileIcon.style.color = 'var(--orange)';
                break;
            // Add more cases if needed
            default:
                // Handle the default case, if any
                break;
        }
    }
}