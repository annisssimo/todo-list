import { UI } from './ui';

export class ElementsCreator {
    static createElement(tagName, textContent) {
        const element = document.createElement(tagName);
        element.textContent = textContent;
        return element;
    }

    static createInputLabel(id, textContent) {
        const labelElement = ElementsCreator.createElement('label', textContent);
        labelElement.htmlFor = id;
        return labelElement;
    }

    static createInput(type, name, id, maxLength, required, focused, placeholder, autofocus) {
        const inputElement = document.createElement('input');
        Object.assign(inputElement, { type, name, id, maxLength, required, focused, placeholder, autofocus });
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

    static createNewTaskForm() {
        const mainContent = document.querySelector('#main-content');

        const formElement = document.createElement('form');
        formElement.setAttribute('id', 'add-new-task-form');

        const radioBtn = ElementsCreator.createButton('button', 'done-btn', '', false);
        radioBtn.classList.add('radio-btn-disabled');

        const divContainer = document.createElement('div');

        const taskNameInputElement = ElementsCreator.createInput('text', 'taskName', 'taskName', 60, true, true, '', true);
        const taskNotesInputElement = ElementsCreator.createInput('text', 'taskNotes', 'taskNotes', 60, false, false, 'Notes');
        const datePicker = ElementsCreator.createInput('date', 'task-date-picker', 'task-date-picker');

        const importantBtn = ElementsCreator.createButton('button', 'important-btn', 'label_important', false);
        importantBtn.classList.add('material-symbols-outlined', 'important-btn-disabled');

        formElement.append(radioBtn, divContainer, importantBtn);
        divContainer.append(taskNameInputElement, taskNotesInputElement, datePicker);
        mainContent.append(formElement);

        taskNameInputElement.focus();

        importantBtn.addEventListener('click', () => {
            importantBtn.classList.toggle('important-btn-clicked');
        }); 
        
        radioBtn.addEventListener('click', () => {
            radioBtn.classList.toggle('radio-btn-clicked');
        });

    }
}