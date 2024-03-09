import './style.css';
import WebFont from 'webfontloader';
import task1 from './task';
import {UI} from './ui.js';

WebFont.load({
  google: {
    families: ['Rubik Doodle Shadow:400'],
  },
});

document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
      tile.addEventListener('click', (event) => UI.updateHeading(event));
  });
});


console.log(task1);