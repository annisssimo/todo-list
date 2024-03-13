import './style.css';
import WebFont from 'webfontloader';
import {Modal} from './modal.js';
import {UI} from './ui.js';

WebFont.load({
  google: {
    families: ['Rubik Doodle Shadow:400'],
  },
});

document.addEventListener('DOMContentLoaded', () => {

  const tilesDiv = document.querySelector('.tiles');
  
    tilesDiv.addEventListener('click', (event) => {
      let clickedTile = event.target.closest('.tile');
      UI.resetListsColors();
      UI.updateHeading(clickedTile);
      UI.changeTileColor(clickedTile)
    }
  );

  const newListBtn = document.querySelector('.new-list');
  newListBtn.addEventListener('click', () => {
    if(!Modal.checkIfModalExists()) {   
      Modal.createModal();
      Modal.showNewListModal();
    } else {
      Modal.showNewListModal();
    }
  });

  //todo: handle plus btn
});
