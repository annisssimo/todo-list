import './style.css';
import WebFont from 'webfontloader';
import {Tile} from './tile.js';
import {Modal} from './modal.js';

WebFont.load({
  google: {
    families: ['Rubik Doodle Shadow:400'],
  },
});

document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tileElement => {
    let tile = new Tile();
    tileElement.addEventListener('click', (event) => tile.chooseTile(event));  
  });

  const newListBtn = document.querySelector('.new-list');
  newListBtn.addEventListener('click', () => Modal.createModal());
});
