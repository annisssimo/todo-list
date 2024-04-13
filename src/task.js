import { List, allList } from './list';
import { UI } from './ui';
import { v4 as uuidv4 } from 'uuid';
import { ElementsCreator } from './elementsCreator';
import todo from './todo';

export class Task {
  constructor(isDone, title, description, dueDate, isImportant) {
    this.id = uuidv4();
    this.isDone = isDone;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate && new Date(dueDate);
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
    const [taskNameInput, taskNotesInput, taskDatePicker, importantBtn, doneBtn] = ElementsCreator.getFormFields();

    const taskName = taskNameInput.value;
    const taskNotes = taskNotesInput.value;
    const dueDate = taskDatePicker.value; //string
    const taskRadioBtn = doneBtn.classList.contains('radio-btn-clicked');
    const isImportant = importantBtn.classList.contains('important-btn-clicked');

    // Создаем объект Task
    const task = new Task(taskRadioBtn, taskName, taskNotes, dueDate, isImportant);
    return task;
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
    const list = List.getActiveCustomList();

    // Создаем объект Task с данными из полей формы
    const task = Task.createTaskFromForm();

    //Добавляем только что созданную задачу в список
    list.addTaskToList(task);
    
    // Выводим задачи текущего списка в main-content
    UI.updateTaskListInMainContent(list);

    //Обновляем счетчики
    List.updateNumbers();

    todo.saveToLocalStorage();
  }

  static deleteTask(selectedTask) {
    let taskId = selectedTask.getAttribute('data-id');
    let activeList = List.getActiveCustomList();
    if(!activeList) return;
    activeList.removeTaskFromAllLists(taskId);
    List.updateNumbers();
    UI.deleteTaskDiv(selectedTask);
    todo.saveToLocalStorage();
  }

  static getTaskToEdit(event) {
    const taskDiv = event.target.closest('.task');
    const taskId = taskDiv.getAttribute('data-id');
    const activeList = List.getActiveCustomList();
    if(!activeList) return;
    const task = activeList.getTaskById(taskId);

    return [ taskDiv, task, activeList ];
  }

  static editTask(event) {
    if(document.querySelector('#edit-task-form')) return;
    if(document.querySelector('#add-new-task-form')) return;
    
    const [ taskDiv, task, activeList ] = Task.getTaskToEdit(event);

    // Создаем новую форму
    const newTaskForm = ElementsCreator.createNewTaskForm('edit-task-form');
    newTaskForm.setAttribute('data-id', task.id);

    //Заполняем новую форму данными из задачи
    ElementsCreator.fillNewTaskForm(task);

    if (newTaskForm) {
      // Заменяем текущую задачу формой на том же месте
      taskDiv.replaceWith(newTaskForm);
    }

    newTaskForm.addEventListener('keypress', function(event) {
      // Проверяем, была ли нажата клавиша Enter
      if (event.key === 'Enter') {
        Task.handleEnterKeyWhenEdit(event, task, activeList);
      }
    });
  }

  static handleEnterKeyWhenEdit(event) {
    event.preventDefault(); // Предотвращаем стандартное действие формы
    
    Task.saveEditedTask();

    // Создаем новую пустую форму таски
    ElementsCreator.createNewTaskForm('add-new-task-form');

    // Вешаем на новую форму слушатель Enter
    UI.handleEnterKeyOnForm();
  }

  updateTaskUsingDataFromForm() {
    const [taskNameInput, taskNotesInput, taskDatePicker, importantBtn, doneBtn] = ElementsCreator.getFormFields();

    this.title = taskNameInput.value;
    this.description = taskNotesInput.value;
    this.dueDate = taskDatePicker.value;
    this.isImportant = importantBtn.classList.contains('important-btn-clicked');
    this.isDone = doneBtn.classList.contains('radio-btn-clicked');
  }

  static saveEditedTask() {
    const editForm = document.querySelector('#edit-task-form');
    const activeList = List.getActiveCustomList();
    const taskId = editForm.getAttribute('data-id');
    const task = activeList.getTaskById(taskId);

    //Заменяем поля задачи данными из формы
    task.updateTaskUsingDataFromForm();

    //Полностью обновляем список
    UI.updateTaskListInMainContent(activeList);

    List.updateNumbers();

    todo.saveToLocalStorage();
  }
}