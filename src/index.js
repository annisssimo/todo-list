import './style.css';
import WebFont from 'webfontloader';
import { Modal } from './modal';
import { UI } from './ui';
import { ElementsCreator } from './elementsCreator';
import { todayList, weekList, allList, importantList } from './list';
import { isToday, startOfWeek, endOfWeek } from 'date-fns';

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
      UI.resetListsColors();
      UI.updateHeading(clickedTile);
      UI.changeTileColor(clickedTile);
      if (clickedTile.id === 'all') {
        UI.updateTaskListInMainContent(allList);
      } else if (clickedTile.id === 'today') {
        todayList.tasks = [];
        allList.tasks.forEach(task => {
          if (isToday(task.dueDate)) {
            todayList.addTask(task);
          }
        });
        UI.updateTaskListInMainContent(todayList);
      } else if (clickedTile.id === 'week') {
        weekList.tasks = [];
        const startDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Начало текущей недели (понедельник)
        const endDate = endOfWeek(new Date(), { weekStartsOn: 1 }); // Конец текущей недели (воскресенье)
        allList.tasks.forEach(task => {
          if (task.dueDate >= startDate && task.dueDate <= endDate) {
            weekList.addTask(task);
          }
        });
        UI.updateTaskListInMainContent(weekList);
      } else if (clickedTile.id === 'important') {
        
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
});
