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
}