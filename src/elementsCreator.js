import { format } from 'date-fns';

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

    static createTaskDiv(task) {
        const formWrapper = document.createElement('div');
        formWrapper.classList.add('task');
    
        const doneBtn = document.createElement('button');
        doneBtn.type = 'button';
        doneBtn.classList.add('done-btn');
        doneBtn.classList.add(task.isDone ? 'radio-btn-clicked' : 'radio-btn-disabled');
        formWrapper.appendChild(doneBtn);
    
        const inputWrapper = document.createElement('div');
    
        const taskNameInput = document.createElement('input');
        taskNameInput.type = 'text';
        taskNameInput.name = 'taskName';
        taskNameInput.classList.add('taskName');
        taskNameInput.maxLength = '60';
        taskNameInput.value = task.title;
        taskNameInput.autofocus = true;
        inputWrapper.appendChild(taskNameInput);
    
        const taskNotesInput = document.createElement('input');
        taskNotesInput.type = 'text';
        taskNotesInput.name = 'taskNotes';
        taskNotesInput.classList.add('taskNotes');
        taskNotesInput.maxLength = '60';
        taskNotesInput.placeholder = 'Notes';
        taskNotesInput.value = task.description;
        inputWrapper.appendChild(taskNotesInput);
    
        const taskDatePickerInput = document.createElement('input');
        taskDatePickerInput.type = 'date';
        taskDatePickerInput.name = 'task-date-picker';
        taskDatePickerInput.classList.add('task-date-picker');
        if (task.dueDate) {
            taskDatePickerInput.value = task.dueDate ? format(task.dueDate, 'yyyy-MM-dd') : '';
        }
        inputWrapper.appendChild(taskDatePickerInput);
    
        formWrapper.appendChild(inputWrapper);
    
        const importantBtn = document.createElement('button');
        importantBtn.type = 'button';
        importantBtn.classList.add('important-btn', 'material-symbols-outlined');
        if (task.isImportant) {
            importantBtn.classList.add('important-btn-clicked');
        } else {
            importantBtn.classList.add('important-btn-disabled');
        }
        importantBtn.textContent = 'label_important';
        formWrapper.appendChild(importantBtn);
    
        // Добавление формы в основной контент
        const mainContent = document.querySelector('#main-content');
        mainContent.appendChild(formWrapper);
    }
}