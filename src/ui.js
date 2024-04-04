import todo from './todo';
import { Task } from './task';
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
            listItem.setAttribute('data-id', list.id);
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
        UI.resetTilesColors();
        UI.resetListsColors();
        clickedList.classList.add('list-clicked');
    }

    static updateTaskListInMainContent(list) {
        const mainContent = document.querySelector('#main-content');
        mainContent.innerHTML = '';
        list.tasks.forEach(task => ElementsCreator.createTaskDiv(task));
    }
    
    static handleEnterKeyOnForm() {
        const formElement = document.querySelector('#add-new-task-form');

        formElement.addEventListener('keypress', function(event) {
            // Проверяем, была ли нажата клавиша Enter
            if (event.key === 'Enter') {
                event.preventDefault(); // Предотвращаем стандартное действие формы

                Task.createTask();

                // Создаем новую пустую форму таски
                ElementsCreator.createNewTaskForm();

                // Вешаем на новую форму слушатель Enter
                UI.handleEnterKeyOnForm();
            }
        });
    }

    static showPlusElement() {
        const plusAddTaskElement = document.querySelector('.plus');
        plusAddTaskElement.classList.remove('hide');
    }

    static hidePlusElement() {
        const plusAddTaskElement = document.querySelector('.plus');
        plusAddTaskElement.classList.add('hide');
    }

    static makeNewListActive(newList) {
        const listItems = document.querySelectorAll('.list-item');

        listItems.forEach(listItem => {
            const dataId = listItem.getAttribute('data-id');

            if(dataId === newList.id) {
                UI.showPlusElement();    
                UI.updateHeading(listItem);
                UI.changeListColor(listItem);
                UI.updateTaskListInMainContent(newList);
            }
        });
    }

    static changeTaskNameColor(formWrapper) {
        if (formWrapper) {
            const firstDivInsideTask = formWrapper.querySelector('div:first-child'); // Находим первый div внутри 'task'
            if (firstDivInsideTask) {
                firstDivInsideTask.classList.toggle('gray-crossed'); // Добавляем класс 'gray-crossed' к первому div внутри 'task'
            }
        }
    }

    static changeColorOfDoneButtonOnClick(doneBtn) {
        doneBtn.classList.toggle('radio-btn-clicked');
        const formWrapper = event.target.closest('.task'); // Находим ближайший родительский элемент с классом 'task'
        UI.changeTaskNameColor(formWrapper);
    }

    static changeColorOfImportantButtonOnClick(importantBtn) {
        importantBtn.classList.toggle('important-btn-clicked');
    }
}