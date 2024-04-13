import {UI} from './ui';
import todo from './todo';
import { isToday, startOfWeek, endOfWeek } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

class List {
  constructor(type, id, heading, color) {
    this.type = type;
    this.id = id;
    this.heading = heading;
    this.color = color;
    this.tasks = [];
  }

  static findClickedListById(clickedList) {
    const listId = clickedList.getAttribute('data-id');
    const list = todo.lists.find(obj => obj.id === listId);
    return list;
  }

  chooseList(event) {
    const clickedList = event.currentTarget;
    let list = List.findClickedListById(clickedList);

    UI.showPlusElement();    
    UI.updateHeading(clickedList);
    UI.changeListColor(clickedList);
    UI.updateTaskListInMainContent(list);
  }

  addTask(task) {
    this.tasks.push(task);
    todo.saveToLocalStorage();
  }

  addTaskToList(task){
    this.addTask(task);
    task.addToAllTasksList();
  }

  getTaskById(taskId) {
    return this.tasks.find(task => task.id === taskId);
  }

  removeTaskById(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  removeTaskFromAllLists(taskId) {
    this.removeTaskById(taskId);
    List.removeFromAllTasksList(taskId);
  }

  countTasksInList() {
    List.filterTodayTasks();
    List.filterWeekTasks();
    List.filterImportantTasks();
    return this.tasks.length;
  }

  editList() {
    const editListNameInput = document.querySelector('#edit-list-name');
    const editListColorInput = document.querySelector('#edit-list-color');

    this.heading = editListNameInput.value;
    this.color = editListColorInput.value;

    todo.saveToLocalStorage();
  }

  static removeFromAllTasksList(taskId) {
    allList.removeTaskById(taskId);
  }

  static filterTodayTasks() {
    todayList.tasks = [];
    allList.tasks.forEach(task => {
      if (isToday(task.dueDate)) {
        todayList.addTask(task);
      }
    });
  }

  static filterWeekTasks() {
    weekList.tasks = [];
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Начало текущей недели (понедельник)
    const endDate = endOfWeek(new Date(), { weekStartsOn: 1 }); // Конец текущей недели (воскресенье)
    allList.tasks.forEach(task => {
      if (task.dueDate >= startDate && task.dueDate <= endDate) {
        weekList.addTask(task);
      }
    });
  }

  static filterImportantTasks() {
    importantList.tasks = [];
    allList.tasks.forEach(task => {
      if (task.isImportant) {
        importantList.addTask(task);
      }
    });
  }

  static updateNumbers() {
    const todayDigit = document.querySelector('#today > .digit');
    const weeklyDigit = document.querySelector('#week > .digit');
    const allDigit = document.querySelector('#all > .digit');
    const importantDigit = document.querySelector('#important > .digit');

    todayDigit.textContent = todayList.countTasksInList();
    weeklyDigit.textContent = weekList.countTasksInList();
    allDigit.textContent = allList.countTasksInList();
    importantDigit.textContent = importantList.countTasksInList();
  }

  static createCustomList(nameInput, colorInput) {
    const newList = new List('custom', uuidv4(), nameInput.value, colorInput.value);
    todo.addList(newList);
    UI.displayMyLists();
    return newList;
  }

  static getActiveCustomList() {
    const activeList = document.querySelector('.list-clicked');
    if(!activeList) return;
    const list = List.findClickedListById(activeList);
    return list;
  }
}

const todayList = new List('default', 1, 'Today', 'var(--blue)');
const weekList = new List('default', 2, 'Weekly', 'var(--red)');
const allList = new List('default', 3, 'All', 'var(--dark-gray)');
const importantList = new List('default', 4, 'Important', 'var(--orange)');

export { List, todayList, weekList, allList, importantList };