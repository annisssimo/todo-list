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
        const confirmButtonElement = ElementsCreator.createButton('submit', `${id}-confirm-btn`, 'OK', true);

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
        Modal.resetDialog('add-new-list');
        dialogElement.showModal();
    }

    static resetDialog(id) {
        const nameInput = document.getElementById(`${id}-name`);
        const colorInput = document.getElementById(`${id}-color`);
        const confirmButton = document.getElementById(`${id}-confirm-btn`);

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
        Modal.resetDialog('edit-list');
        Modal.fillModalWithListData(event);
        dialogElement.showModal();
    }

    static fillModalWithListData(event) {

    }
}