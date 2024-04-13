import { UI } from './ui';
import { Task } from './task';
import { List } from './list';
import todo from './todo';

export class LocalStorage {

  static uploadListsAndTasksFromLocalStorage() {
    const savedLists = JSON.parse(localStorage.getItem("todoLists"));
    if (savedLists) {
      savedLists.forEach((listData) => {
        const list = new List(
          listData.type,
          listData.id,
          listData.heading,
          listData.color
        );
        list.tasks = listData.tasks.map((taskData) => {
          return new Task(
            taskData.isDone,
            taskData.title,
            taskData.description,
            taskData.dueDate,
            taskData.isImportant
          );
        });

        todo.addList(list);
        UI.displayMyLists();
      });
    }
    LocalStorage.uploadDefaultLists();
  }

  static uploadDefaultLists() {
    todo.lists.forEach(list => {
      list.tasks.forEach(task => {
        task.addToAllTasksList();
        List.filterTodayTasks();
        List.filterWeekTasks();
        List.filterImportantTasks();
      })
    });
    List.updateNumbers();
  }
}
