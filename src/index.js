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
      UI.hidePlusElement();
      UI.resetListsColors();
      UI.updateHeading(clickedTile);
      UI.changeTileColor(clickedTile);

      switch(clickedTile.id) {
        case 'all':
          UI.updateTaskListInMainContent(allList);
          break;
        case 'today':
          List.filterTodayTasks();
          UI.updateTaskListInMainContent(todayList);
          break;
        case 'week':
          List.filterWeekTasks();
          UI.updateTaskListInMainContent(weekList);
          break;
        case 'important':
          List.filterImportantTasks();
          UI.updateTaskListInMainContent(importantList);
          break;
        default:
          break;
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
    
    const tasks = document.querySelectorAll('.task');
    const clickedElement = event.target;
    if (!clickedElement.closest('.task')) {
      tasks.forEach(t => t.classList.remove('selected-task'));
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      const selectedTask = document.querySelector('.selected-task'); // Находим задачу с классом .selected
      if (selectedTask) { // Если такая задача есть
        let taskId = selectedTask.getAttribute('data-id');
        let activeList = Task.getActiveCustomList();
        activeList.removeTaskFromAllLists(taskId);
        List.updateNumbers(activeList);
        selectedTask.remove(); // Удаляем div задачи
      }
    }
});

});