import './style.css';
import WebFont from 'webfontloader';
import task1 from './task';
import {Tile} from './tile.js';

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
});


console.log(task1);