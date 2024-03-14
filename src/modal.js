import { List } from './list';
import { UI } from './ui';
import todo from './todo';
import { ElementsCreator } from './elementsCreator';

export class Modal {

    static checkIfModalExists() {
        let dialog = document.querySelector('#add-new-list-dialog');

        if (dialog) {
            return true;
        } else {
            return false;
        }

    }

    static createModal() {
        const dialogElement = document.createElement('dialog');
        dialogElement.id = 'add-new-list-dialog';

        const formElement = document.createElement('form');
        formElement.id = 'add-new-list-form';

        const headingElement = ElementsCreator.createElement('h3', 'New list');

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
            const newList = new List(nameInput.value, colorInput.value);
            todo.addList(newList);
            UI.displayMyLists(todo.lists);
            console.log(todo);
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
}