// import { todayList } from './todayList.js';
// import { weekList } from './weekList.js';
// import { allList } from './allList.js';
// import { importantList } from './importantList.js';
// import { List } from './list.js';
import { Task } from './task.js';
import { ElementsCreator } from './elementsCreator';


export class UI {

    static updateHeading(clickedList) {
        const text = clickedList.querySelector('.text');
        const heading = document.querySelector('h2');
        heading.textContent = text.textContent;
    }

    static resetTilesColors() {
        const allTiles = document.querySelectorAll('.tile');
        allTiles.forEach(tile => {
            tile.classList.remove('today-tile-clicked', 'week-tile-clicked', 'all-tile-clicked', 'important-tile-clicked', 'list-clicked');

            const tileIcon = tile.querySelector('.material-symbols-outlined');
            const tileDigit = tile.querySelector('.digit');

            tileIcon.style.background = '';
            tileIcon.style.color = 'white';
            tileDigit.style.color = '';
        });
    }

    static changeTileColor(clickedTile) {
        UI.resetTilesColors();
    
        if (clickedTile.classList.contains('tile')) {
            clickedTile.classList.add(`${clickedTile.id}-tile-clicked`);
    
            const tileIcon = clickedTile.querySelector('.material-symbols-outlined');
            const tileDigit = clickedTile.querySelector('.digit');
    
            if (tileIcon) {
                tileIcon.style.background = 'white';
                tileIcon.style.color = 'white';
    
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
    
            if (tileDigit) {
                tileDigit.style.color = 'white';
            }
        } else if (clickedTile.classList.contains('list-item')) {
            clickedTile.classList.add('list-clicked');
    
            const tileIcon = clickedTile.querySelector('.material-symbols-outlined');
            if (tileIcon) {
                tileIcon.style.background = 'white';
                tileIcon.style.color = 'white';
            }
        }
    }    
    

    static resetMyLists(listContainer) {
        listContainer.innerHTML = '';
    }

    static displayMyLists(lists) {
        const sidebar = document.querySelector('#sidebar');
        let listContainer = document.querySelector('#list-container');
        
        if (!listContainer) {
            listContainer = document.createElement('div');
            listContainer.id = 'list-container';
            sidebar.appendChild(listContainer);
        } else {
            UI.resetMyLists(listContainer);
        }
        
        const listsHeading = document.createElement('p');
        listsHeading.textContent = 'My lists';
        listsHeading.classList.add('my-lists-heading');
        
        sidebar.appendChild(listContainer);
        listContainer.appendChild(listsHeading);

        lists.forEach(list => {
            const listItem = document.createElement('div');
            listItem.classList.add('list-item');
            listContainer.appendChild(listItem);

            const listColor = document.createElement('div');
            const listName = document.createElement('p');
            listColor.classList.add('list-color');
            listName.classList.add('text');

            listColor.style.backgroundColor = list.color;
            listName.textContent = list.heading;
            
            listItem.appendChild(listColor);
            listItem.appendChild(listName);

            listItem.addEventListener('click', list.chooseList);
        });
    }

    static resetListsColors() {
        let lists = document.querySelectorAll('.list-item');
        lists.forEach(list => list.classList.remove('list-clicked'));
    }

    static changeListColor(clickedList) {
        UI.resetListsColors();
        clickedList.classList.add('list-clicked');
    }

    static createNewTaskForm() {
        const mainContent = document.querySelector('#main-content');

        const formElement = document.createElement('form');
        formElement.id = 'add-new-task-form';

        const radioBtn = ElementsCreator.createInput('radio', 'done-btn', 'done-btn');

        const divContainer = document.createElement('div');

        const taskNameInputElement = ElementsCreator.createInput('text', 'taskName', 'taskName', 60, true, true, '', true);
        const taskNotesInputElement = ElementsCreator.createInput('text', 'taskNotes', 'taskNotes', 60, false, false, 'Notes');
        const datePicker = ElementsCreator.createInput('date', 'task-date-picker', 'task-date-picker');

        const importantBtn = ElementsCreator.createButton('button', 'important-btn', 'label_important', false);
        importantBtn.classList.add('material-symbols-outlined', 'important-btn-disabled');

        formElement.append(radioBtn, divContainer, importantBtn);
        divContainer.append(taskNameInputElement, taskNotesInputElement, datePicker);
        mainContent.append(formElement);

        importantBtn.addEventListener('click', () => {
            importantBtn.classList.add('important-btn-clicked');
        });

        // taskNameInputElement.addEventListener('blur', () => {
        //     const newTask = new Task(radioBtn.value);
        //     console.log('newTask');
        // });

        // formElement.addEventListener('blur', () => {
        //     console.log('FOOOO');
        //     const newTask = new Task(radioBtn.value, taskNameInputElement.value, taskNotesInputElement.value, datePicker.value);
        //     console.log(newTask);
        // });
    }
}