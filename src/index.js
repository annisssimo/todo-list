import './style.css';
import WebFont from 'webfontloader';
import { Modal } from './modal';
import { UI } from './ui';
import { ElementsCreator } from './elementsCreator';

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
    ElementsCreator.createNewTaskForm('id', 'add-new-task-form');
    UI.handleEnterKeyOnForm();

  });
});
