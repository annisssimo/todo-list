import { format } from 'date-fns';
import { UI } from './ui';
import { List } from './list';


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
        if(document.querySelector('#add-new-task-form')) return;

        const mainContent = document.querySelector('#main-content');

        const formElement = document.createElement('form');

        formElement.setAttribute('id', 'add-new-task-form');

        const radioBtn = ElementsCreator.createButton('button', 'done-btn', '', false);
        radioBtn.classList.add('radio-btn-disabled');

        const divContainer = document.createElement('div');

        const taskNameInputElement = ElementsCreator.createInput('text', 'task-name', 'task-name', 60, true, true, '', true);
        const taskNotesInputElement = ElementsCreator.createInput('text', 'task-notes', 'task-notes', 60, false, false, 'Notes');
        const datePicker = ElementsCreator.createInput('date', 'task-date-picker', 'task-date-picker');

        const importantBtn = ElementsCreator.createButton('button', 'important-btn', 'label_important', false);
        importantBtn.classList.add('material-symbols-outlined', 'important-btn-disabled');

        formElement.append(radioBtn, divContainer, importantBtn);
        divContainer.append(taskNameInputElement, taskNotesInputElement, datePicker);
        mainContent.append(formElement);

        taskNameInputElement.focus();

        importantBtn.addEventListener('click', () => {
            UI.changeColorOfImportantButtonOnClick(importantBtn);
        });

        radioBtn.addEventListener('click', () => {
            UI.changeColorOfDoneButtonOnClick(radioBtn);
        });
    }

    static createDoneBtn(task) {
        const doneBtn = document.createElement('button');
        doneBtn.type = 'button';
        doneBtn.classList.add('done-btn');
        doneBtn.classList.add(task.isDone ? 'radio-btn-clicked' : 'radio-btn-disabled');
        return doneBtn;
    }

    static createTaskNameInput(task) {
        const taskNameInput = document.createElement('div');
        taskNameInput.name = 'task-name';
        taskNameInput.classList.add('task-name');
        taskNameInput.maxLength = '60';
        taskNameInput.textContent = task.title;
        task.isDone ? taskNameInput.classList.add('gray-crossed') : taskNameInput.classList.remove('gray-crossed');
        return taskNameInput;
    }

    static createTaskNotesInput(task) {
        const taskNotesInput = document.createElement('div');
        taskNotesInput.name = 'task-notes';
        taskNotesInput.classList.add('task-notes');
        taskNotesInput.maxLength = '60';
        taskNotesInput.placeholder = 'Notes';
        taskNotesInput.textContent = task.description;
        return taskNotesInput;
    }

    static createTaskDatePickerInput(task) {
        const taskDatePickerInput = document.createElement('div');
        taskDatePickerInput.name = 'task-date-picker';
        taskDatePickerInput.classList.add('task-date-picker');
        if (task.dueDate) {
            taskDatePickerInput.textContent = task.dueDate ? format(task.dueDate, 'dd.MM.yyyy') : '';
        }
        return taskDatePickerInput;
    }

    static createImportantBtn(task) {
        const importantBtn = document.createElement('button');
        importantBtn.type = 'button';
        importantBtn.classList.add('important-btn', 'material-symbols-outlined');
        if (task.isImportant) {
            importantBtn.classList.add('important-btn-clicked');
        } else {
            importantBtn.classList.add('important-btn-disabled');
        }
        importantBtn.textContent = 'label_important';
        return importantBtn;
    }

    static createTaskDiv(task) {
        const formWrapper = document.createElement('div');
        formWrapper.classList.add('task');
    
        const doneBtn = ElementsCreator.createDoneBtn(task);
        formWrapper.appendChild(doneBtn);
    
        const inputWrapper = document.createElement('div');
        
        const taskNameInput = ElementsCreator.createTaskNameInput(task);
        inputWrapper.appendChild(taskNameInput);
    
        const taskNotesInput = ElementsCreator.createTaskNotesInput(task);
        inputWrapper.appendChild(taskNotesInput);
    
        const taskDatePickerInput = ElementsCreator.createTaskDatePickerInput(task);
        inputWrapper.appendChild(taskDatePickerInput);
    
        formWrapper.appendChild(inputWrapper);
    
        const importantBtn = ElementsCreator.createImportantBtn(task);
        formWrapper.appendChild(importantBtn);
    
        // Добавление формы в основной контент
        const mainContent = document.querySelector('#main-content');
        mainContent.appendChild(formWrapper);

        importantBtn.addEventListener('click', () => {
            UI.changeColorOfImportantButtonOnClick(importantBtn);
            task.toggleImportant();
            List.updateNumbers();
        });

        doneBtn.addEventListener('click', () => {
            UI.changeColorOfDoneButtonOnClick(radioBtn);
        });
    }
}