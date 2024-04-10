import { List } from './list';
import { UI } from './ui';
import { ElementsCreator } from './elementsCreator';

export class Modal {

    static checkIfModalExists(modalId) {
        let dialog = document.querySelector(modalId);

        if (dialog) {
            return true;
        } else {
            return false;
        }

    }

    static createModal(heading, id) {
        const dialogElement = document.createElement('dialog');
        dialogElement.id = `${id}-dialog`;

        const formElement = document.createElement('form');
        formElement.id = `${id}-form`;

        const headingElement = ElementsCreator.createElement('h3', heading);

        const nameLabelElement = ElementsCreator.createInputLabel(`${id}-name`, 'Name:');
        const nameInputElement = ElementsCreator.createInput('text', 'name', `${id}-name`, 60, true, true, '');

        const colorLabelElement = ElementsCreator.createInputLabel(`${id}-color`, 'Color:');
        const colorInputElement = ElementsCreator.createInput('color', 'color', `${id}-color`);

        const cancelButtonElement = ElementsCreator.createButton('button', `${id}-cancel-btn`, 'Cancel');
        const confirmButtonElement = ElementsCreator.createButton('submit', `${id}-confirm-btn`, 'OK', false);

        formElement.append(
            headingElement,
            ElementsCreator.createInputDiv(nameLabelElement, nameInputElement),
            ElementsCreator.createInputDiv(colorLabelElement, colorInputElement),
            ElementsCreator.createModalButtonsDiv(cancelButtonElement, confirmButtonElement)
        );

        dialogElement.appendChild(formElement);
        document.body.appendChild(dialogElement);

        Modal.handleConfirmBtn(confirmButtonElement, dialogElement, nameInputElement, colorInputElement);
        Modal.handleCancelBtn(cancelButtonElement, dialogElement);
        Modal.checkNameInput(nameInputElement, confirmButtonElement);
    }

    static handleConfirmBtn(confirmButton, dialogElement, nameInput, colorInput) {
        confirmButton.addEventListener('click', (event) => {
            event.preventDefault();
            if(confirmButton.id === 'add-new-list-confirm-btn') {
                const newList = List.createCustomList(nameInput, colorInput);
                UI.makeNewListActive(newList);
            }
            else if (confirmButton.id === 'edit-list-confirm-btn') {
                const activeListToEdit = List.getActiveCustomList();
                List.editList(activeListToEdit);
                UI.displayMyLists();
            }
            dialogElement.close();
        });
    }

    static handleCancelBtn(cancelButton, dialogElement) {
        cancelButton.addEventListener('click', () => {
            dialogElement.close();
        });
    }

    static checkNameInput(nameInput, confirmButton) {
        nameInput.addEventListener('input', () => {
            confirmButton.disabled = !nameInput.value.trim();
        });
    }

    static showNewListModal() {
        const dialogElement = document.querySelector('#add-new-list-dialog');
        Modal.resetDialog();
        dialogElement.showModal();
    }

    static resetDialog() {
        const nameInput = document.getElementById(`add-new-list-name`);
        const colorInput = document.getElementById(`add-new-list-color`);
        const confirmButton = document.getElementById(`add-new-list-confirm-btn`);

        // Clear input fields
        nameInput.value = '';
        colorInput.value = '';

        // Reset confirm button state
        confirmButton.disabled = true;
    }

    static handleDoubleClickOnList(event) {
        if(!Modal.checkIfModalExists('#edit-list-dialog')) {   
            Modal.createModal('Edit List', 'edit-list');
            Modal.showEditListModal(event);
          } else {
            Modal.showEditListModal(event);
        }
    }

    static showEditListModal(event) {
        const dialogElement = document.querySelector('#edit-list-dialog');
        Modal.fillModalWithListData(event);
        dialogElement.showModal();
    }

    static fillModalWithListData(event) {
        const listDiv = event.target.closest('.list-item');
        
        // Получаем текст и цвет списка
        const listName = listDiv.querySelector('.text').textContent;
        const listColor = listDiv.querySelector('.list-color').style.backgroundColor;

        // Convert RGB color to HEX format
        const hexColor = UI.rgbToHex(listColor);
        
        console.log('List Color:', listColor);
        console.log('Hex Color:', hexColor);

        // Находим нужные элементы в модальном окне для редактирования
        const editListNameInput = document.querySelector('#edit-list-name');
        const editListColorInput = document.querySelector('#edit-list-color');
        
        // Устанавливаем значения в соответствующие поля в модальном окне
        editListNameInput.value = listName;
        editListColorInput.value = `#${hexColor}`;
    }
}