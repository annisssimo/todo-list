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
        dialogElement.id = id;

        const formElement = document.createElement('form');
        formElement.id = 'add-new-list-form';

        const headingElement = ElementsCreator.createElement('h3', heading);

        const nameLabelElement = ElementsCreator.createInputLabel('name', 'Name:');
        const nameInputElement = ElementsCreator.createInput('text', 'name', 'name', 60, true, true, '');

        const colorLabelElement = ElementsCreator.createInputLabel('color', 'Color:');
        const colorInputElement = ElementsCreator.createInput('color', 'color', 'color');

        const cancelButtonElement = ElementsCreator.createButton('button', 'cancel-btn', 'Cancel');
        const confirmButtonElement = ElementsCreator.createButton('submit', 'confirm-btn', 'OK', true);

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
            const newList = List.createCustomList(nameInput, colorInput);
            UI.makeNewListActive(newList);
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
        const nameInput = document.getElementById('name');
        const colorInput = document.getElementById('color');
        const confirmButton = document.getElementById('confirm-btn');

        // Clear input fields
        nameInput.value = '';
        colorInput.value = '';

        // Reset confirm button state
        confirmButton.disabled = true;
    }

    static editList() {
        if(!Modal.checkIfModalExists('#edit-list-dialog')) {   
            Modal.createModal('Edit List', 'edit-list-dialog');
            Modal.showEditListModal();
          } else {
            Modal.showEditListModal();
        }
    }

    static showEditListModal() {
        const dialogElement = document.querySelector('#edit-list-dialog');
        Modal.resetDialog();
        dialogElement.showModal();
    }
}