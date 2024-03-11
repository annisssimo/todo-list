import './style.css';
import WebFont from 'webfontloader';
import {Modal} from './modal.js';

WebFont.load({
  google: {
    families: ['Rubik Doodle Shadow:400'],
  },
});

document.addEventListener('DOMContentLoaded', () => {
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
