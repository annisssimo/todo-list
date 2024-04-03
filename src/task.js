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

  static findListFromHeader() {

    const listName = document.querySelector('h2').textContent;
    const list = todo.lists.find(obj => obj.heading === listName);

    return list;
  }

  static createTask() {
    const taskName = Task.checkTheTaskNameForCompleteness();
    // Exit method if taskName is false (indicating taskNameInput doesn't exist)
    if (!taskName) {
        return;
    }

    // Сопоставляем выбранный список с существующим в массиве
    const list = Task.findListFromHeader();

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