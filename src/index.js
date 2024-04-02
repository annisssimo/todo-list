import './style.css';
import WebFont from 'webfontloader';
import { Modal } from './modal';
import { UI } from './ui';
import { ElementsCreator } from './elementsCreator';
import { todayList, weekList, allList, importantList } from './list';
import { Task } from './task';
import { List } from './list';

WebFont.load({
  google: {
    families: ['Rubik Doodle Shadow:400'],
  },
});

document.addEventListener('DOMContentLoaded', () => {

  const tilesDiv = document.querySelector('.tiles');
  
  tilesDiv.addEventListener('click', (event) => {
    let clickedTile = event.target.closest('.tile');
    if (clickedTile) {
      const plusAddTaskElement = document.querySelector('.plus');
      plusAddTaskElement.classList.add('hide');

      UI.resetListsColors();
      UI.updateHeading(clickedTile);
      UI.changeTileColor(clickedTile);
      if (clickedTile.id === 'all') {
        UI.updateTaskListInMainContent(allList);
      } else if (clickedTile.id === 'today') {
        List.filterTodayTasks();
        UI.updateTaskListInMainContent(todayList);
      } else if (clickedTile.id === 'week') {
        List.filterWeekTasks();
        UI.updateTaskListInMainContent(weekList);
      } else if (clickedTile.id === 'important') {
        List.filterImportantTasks();
        UI.updateTaskListInMainContent(importantList);
      }
    }
  });

  const newListBtn = document.querySelector('.new-list');
  newListBtn.addEventListener('click', () => {
    if(!Modal.checkIfModalExists()) {   
      Modal.createModal();
      Modal.showNewListModal();
    } else {
      Modal.showNewListModal();
    }
  });

  const newTaskBtn = document.querySelector('.plus');
  newTaskBtn.addEventListener('click', () => {
    ElementsCreator.createNewTaskForm();
    UI.handleEnterKeyOnForm();
  });

  const mainContent = document.querySelector('#main-content');
  mainContent.addEventListener('click', (event) => {
    if(!event.target.closest('.task') && !event.target.closest('#add-new-task-form')) Task.createTask();
  });

});
