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
            default:
                break;
        }
    }

    static resetMyLists(listContainer) {
        listContainer.innerHTML = '';
    }

    static displayMyLists(lists) {
        const sidebar = document.querySelector('#sidebar');
        let listContainer = document.querySelector('#listContainer');

        if (!listContainer) {
            listContainer = document.createElement('div');
            listContainer.id = 'listContainer';
            sidebar.appendChild(listContainer);
        } else {
            // If it exists, reset its content
            UI.resetMyLists(listContainer);
        }
        
        const listsHeading = document.createElement('p');
        listsHeading.textContent = 'My lists';
        listsHeading.classList.add('my-lists-heading');
        
        sidebar.appendChild(listContainer);
        listContainer.appendChild(listsHeading);

        lists.forEach(list => {
            const listItem = document.createElement('div');
            listItem.className = 'list-item';
            listContainer.appendChild(listItem);

            const listColor = document.createElement('div');
            const listName = document.createElement('p');
            listColor.className = 'list-color';

            listColor.style.backgroundColor = list.color;
            listName.textContent = list.name;
            
            listItem.appendChild(listColor);
            listItem.appendChild(listName);
        });
    }
}