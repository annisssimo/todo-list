import { List } from './list';
import { UI } from './ui';
import todo from './todo';

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

        const headingElement = Modal.createElement('h3', 'New list');

        const nameLabelElement = Modal.createInputLabel('name', 'Name:');
        const nameInputElement = Modal.createInput('text', 'name', 'name', 60, true, true);

        const colorLabelElement = Modal.createInputLabel('color', 'Color:');
        const colorInputElement = Modal.createInput('color', 'color', 'color');

        const cancelButtonElement = Modal.createButton('button', 'cancel-btn', 'Cancel');
        const confirmButtonElement = Modal.createButton('submit', 'confirm-btn', 'OK', true);

        formElement.append(
            headingElement,
            Modal.createInputDiv(nameLabelElement, nameInputElement),
            Modal.createInputDiv(colorLabelElement, colorInputElement),
            Modal.createModalButtonsDiv(cancelButtonElement, confirmButtonElement)
        );

        dialogElement.appendChild(formElement);
        document.body.appendChild(dialogElement);

        Modal.handleConfirmBtn(confirmButtonElement, dialogElement, nameInputElement, colorInputElement);
        Modal.handleCancelBtn(cancelButtonElement, dialogElement);
        Modal.checkNameInput(nameInputElement, confirmButtonElement);
    }

    static createElement(tagName, textContent) {
        const element = document.createElement(tagName);
        element.textContent = textContent;
        return element;
    }

    static createInputLabel(id, textContent) {
        const labelElement = Modal.createElement('label', textContent);
        labelElement.htmlFor = id;
        return labelElement;
    }

    static createInput(type, name, id, maxLength, required, focused) {
        const inputElement = document.createElement('input');
        Object.assign(inputElement, { type, name, id, maxLength, required, focused });
        return inputElement;
    }

    static createButton(type, id, textContent, disabled) {
        const buttonElement = document.createElement('button');
        Object.assign(buttonElement, { type, id, textContent, disabled });
        return buttonElement;
    }

    static createInputDiv(label, input) {
        const divElement = document.createElement('div');
        divElement.className = 'input';
        divElement.append(label, input);
        return divElement;
    }

    static createModalButtonsDiv(cancelButton, confirmButton) {
        const divElement = document.createElement('div');
        divElement.className = 'modal-buttons';
        divElement.append(cancelButton, confirmButton);
        return divElement;
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