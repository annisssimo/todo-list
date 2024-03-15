import {parse} from 'date-fns';

export class Task {
  constructor(isDone, title, description, dueDate, isImportant) {
    this.isDone = isDone;
    this.title = title;
    this.description = description;
    this.dueDate = parse(dueDate, 'yyyy-MM-dd', new Date());
    this.isImportant = isImportant;
  }

  // Функция для создания объекта Task из данных формы
  static createTaskFromForm() {
    const taskNameInput = document.getElementById('taskName');
    const taskNotesInput = document.getElementById('taskNotes');
    const datePicker = document.getElementById('task-date-picker');
    const isImportant = document.getElementById('important-btn').classList.contains('important-btn-clicked');

    const taskName = taskNameInput.value;
    const taskNotes = taskNotesInput.value;
    const dueDate = datePicker.value;

    // Создаем объект Task
    const task = new Task(false, taskName, taskNotes, dueDate, isImportant);
    return task;
  }
}