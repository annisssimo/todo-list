export class Modal {
    static createModal() {
        // Creating dialog element
        const dialogElement = document.createElement('dialog');
        dialogElement.id = 'add-new-list-dialog';

        // Creating form element
        const formElement = document.createElement('form');
        formElement.id = 'add-new-list-form';

        // Creating heading element
        const headingElement = document.createElement('h3');
        headingElement.textContent = 'New list';

        // Creating input for name
        const nameLabelElement = document.createElement('label');
        nameLabelElement.htmlFor = 'name';
        nameLabelElement.textContent = 'Name:';

        const nameInputElement = document.createElement('input');
        nameInputElement.name = 'name';
        nameInputElement.id = 'name';
        nameInputElement.type = 'text';
        nameInputElement.maxLength = '60';
        nameInputElement.required = true;

        // Creating input for color
        const colorLabelElement = document.createElement('label');
        colorLabelElement.htmlFor = 'color';
        colorLabelElement.textContent = 'Color:';

        const colorInputElement = document.createElement('input');
        colorInputElement.name = 'color';
        colorInputElement.id = 'color';
        colorInputElement.type = 'color';

        // Creating modal buttons
        const cancelButtonElement = document.createElement('button');
        cancelButtonElement.type = 'button';
        cancelButtonElement.id = 'cancel-btn';
        cancelButtonElement.textContent = 'Cancel';

        const confirmButtonElement = document.createElement('button');
        confirmButtonElement.type = 'submit';
        confirmButtonElement.id = 'confirm-btn';
        confirmButtonElement.disabled = true;
        confirmButtonElement.textContent = 'Ok';

        // Appending elements to form
        formElement.append(
            headingElement,
            Modal.createInputDiv(nameLabelElement, nameInputElement),
            Modal.createInputDiv(colorLabelElement, colorInputElement),
            Modal.createModalButtonsDiv(cancelButtonElement, confirmButtonElement)
        );

        // Appending form to dialog
        dialogElement.appendChild(formElement);

        // Appending dialog to body
        document.body.appendChild(dialogElement);

        dialogElement.showModal();
    }

    // Helper function to create input div
    static createInputDiv(label, input) {
        const divElement = document.createElement('div');
        divElement.className = 'input';
        divElement.append(label, input);
        return divElement;
    }

    // Helper function to create modal buttons div
    static createModalButtonsDiv(cancelButton, confirmButton) {
        const divElement = document.createElement('div');
        divElement.className = 'modal-buttons';
        divElement.append(cancelButton, confirmButton);
        return divElement;
    }
}
