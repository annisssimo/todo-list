import { parse } from 'date-fns';
import { List, allList } from './list';
import { UI } from './ui';
import { v4 as uuidv4 } from 'uuid';


export class Task {
  constructor(isDone, title, description, dueDate, isImportant) {
    this.id = uuidv4();
    this.isDone = isDone;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate ? parse(dueDate, 'yyyy-MM-dd', new Date()) : '';
    this.isImportant = isImportant;
  }

  addToAllTasksList() {
    allList.addTask(this);
  }

  toggleImportant() {
    this.isImportant = !this.isImportant;
  }

  toggleDone() {
    this.isDone = !this.isDone;
  }

  static checkTheTaskNameForCompleteness() {
    const taskNameInput = document.getElementById('task-name');
    // Check if taskNameInput exists
    if (taskNameInput) {
      return taskNameInput.value.trim();
    } else {
      return false; // Return false if taskNameInput is null
    }
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

  static getActiveCustomList() {
    const activeList = document.querySelector('.list-clicked');
    const list = List.findClickedListById(activeList);

    return list;
  }

  static createTask() {
    const taskName = Task.checkTheTaskNameForCompleteness();
    // Exit method if taskName is false (indicating taskNameInput doesn't exist)
    if (!taskName) {
      // Check if the form exists before removing it
      const addNewTaskForm = document.querySelector('#add-new-task-form');
      if (addNewTaskForm) {
        // If the form exists, remove it
        addNewTaskForm.remove();
      }
      return;
    }

    // Сопоставляем выбранный список с существующим в массиве
    const list = Task.getActiveCustomList();

    // Создаем объект Task с данными из полей формы
    const task = Task.createTaskFromForm();

    //Добавляем только что созданную задачу в список
    list.addTaskToList(task);
    
    // Выводим задачи текущего списка в main-content
    UI.updateTaskListInMainContent(list);

    //Обновляем счетчики
    List.updateNumbers(list);

  }
}