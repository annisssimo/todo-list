import {UI} from './ui';
import todo from './todo';
import { isToday, startOfWeek, endOfWeek } from 'date-fns';


class List {
    constructor(type, heading, color) {
        this.type = type;
        this.heading = heading;
        this.color = color;
        this.tasks = [];
    }

    chooseList(event) {
        const clickedList = event.currentTarget;
        const listHeading = clickedList.querySelector('.text').textContent;
        const list = todo.lists.find(obj => obj.heading === listHeading);

        const plusAddTaskElement = document.querySelector('.plus');
        plusAddTaskElement.classList.remove('hide');
    
        UI.resetTilesColors();
        UI.updateHeading(clickedList);
        UI.changeListColor(clickedList);
        UI.updateTaskListInMainContent(list);
    }

    addTask(task) {
        this.tasks.push(task);
    }

    addTaskToList(task){
        this.addTask(task);
        task.addToAllTasksList();
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
}

const todayList = new List('default', 'Today', 'var(--blue)');
const weekList = new List('default', 'Weekly', 'var(--red)');
const allList = new List('default', 'All', 'var(--dark-gray)');
const importantList = new List('default', 'Important', 'var(--orange)');

export { List, todayList, weekList, allList, importantList };