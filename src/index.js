import './style.css';
import { UI } from './ui';
import { LocalStorage } from './localStorage';
import { todayList } from './list';

UI.loadFonts();

document.addEventListener('DOMContentLoaded', () => {
  
  LocalStorage.uploadListsAndTasksFromLocalStorage();
  UI.updateTaskListInMainContent(todayList);

  UI.handleTileClicks();
  UI.handleNewListBtn();
  UI.handleNewTaskBtn();
  UI.handleMainContentClick();
  UI.handleKeyBoardTaskDeleting();

});