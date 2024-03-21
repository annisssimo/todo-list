import { parse } from 'date-fns';
import { List, todayList, weekList, allList, importantList } from './list';

export class Task {
  constructor(isDone, title, description, dueDate, isImportant) {
    this.isDone = isDone;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate ? parse(dueDate, 'yyyy-MM-dd', new Date()) : '';
    this.isImportant = isImportant;
  }

  addToAllTasksList() {
    allList.addTask(this);
  }

  // Функция для создания объекта Task из данных формы
  static createTaskFromForm() {
    const taskRadioBtn = document.querySelector('#done-btn').classList.contains('radio-btn-clicked');
    const taskNameInput = document.querySelector('#task-name');
    const taskNotesInput = document.querySelector('#task-notes');
    const datePicker = document.querySelector('#task-date-picker');
    const isImportant = document.querySelector('#important-btn').classList.contains('important-btn-clicked');

    const taskName = taskNameInput.value;
    const taskNotes = taskNotesInput.value;
    const dueDate = datePicker.value;

    // Создаем объект Task
    const task = new Task(taskRadioBtn, taskName, taskNotes, dueDate, isImportant);
    return task;
  }
}