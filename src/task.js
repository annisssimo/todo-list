import { parse } from 'date-fns';
import { List, todayList, weekList, allList, importantList } from './list';
import todo from './todo';
import { UI } from './ui';
import { ElementsCreator } from './elementsCreator';


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

  static checkTheTaskNameForCompleteness() {
    // Создаем объект Task только если поле задачи задано
    const taskNameInput = document.getElementById('task-name');

    return taskNameInput.value.trim();
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

  static findListFromHeader() {

    if (!Task.checkTheTaskNameForCompleteness()) return;
    const listName = document.querySelector('h2').textContent;
    const list = todo.lists.find(obj => obj.heading === listName);

    return list;
  }

  static createTask() {
    // Сопоставляем выбранный список с существующим в массиве
    const list = Task.findListFromHeader();

    // Создаем объект Task с данными из полей формы
    const task = Task.createTaskFromForm();

    //Добавляем только что созданную задачу в список
    list.addTaskToList(task);
    
    // Выводим задачу в main-content
    UI.updateTaskListInMainContent(list);
  }
}