import './style.css';
import { UI } from './ui';
import { LocalStorage } from './localStorage';

UI.loadFonts();

document.addEventListener('DOMContentLoaded', () => {
  
  LocalStorage.uploadListsAndTasksFromLocalStorage();

  UI.handleTileClicks();
  UI.handleNewListBtn();
  UI.handleNewTaskBtn();
  UI.handleMainContentClick();
  UI.handleKeyBoardTaskDeleting();

});