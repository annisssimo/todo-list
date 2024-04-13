import WebFont from 'webfontloader';
import { Task } from './task';
import { ElementsCreator } from './elementsCreator';
import todo from './todo';
import { List } from './list';
import { todayList, weekList, allList, importantList } from './list';
import { Modal } from './modal';


export class UI {
  static loadFonts() {
    WebFont.load({
      google: {
        families: ["Rubik Doodle Shadow:400"],
      },
    });
  }

  static handleTileClicks() {
    const tilesDiv = document.querySelector('.tiles');

    tilesDiv.addEventListener('click', (event) => {
      let clickedTile = event.target.closest('.tile');
      if (clickedTile) {
        UI.hidePlusElement();
        UI.resetListsColors();
        UI.updateHeading(clickedTile);
        UI.changeTileColor(clickedTile);

        switch (clickedTile.id) {
          case 'all':
            UI.updateTaskListInMainContent(allList);
            break;
          case 'today':
            List.filterTodayTasks();
            UI.updateTaskListInMainContent(todayList);
            break;
          case 'week':
            List.filterWeekTasks();
            UI.updateTaskListInMainContent(weekList);
            break;
          case 'important':
            List.filterImportantTasks();
            UI.updateTaskListInMainContent(importantList);
            break;
          default:
            break;
        }
      }
    });
  }

  static handleNewListBtn() {
    const newListBtn = document.querySelector('.new-list');
    newListBtn.addEventListener('click', () => {
      if(!Modal.checkIfModalExists('#add-new-list-dialog')) {   
        Modal.createModal('New List', 'add-new-list');
        Modal.showNewListModal();
      } else {
        Modal.showNewListModal();
      }
    });
  }

  static handleNewTaskBtn() {
    const newTaskBtn = document.querySelector('.plus');
    newTaskBtn.addEventListener('click', () => {
      ElementsCreator.createNewTaskForm('add-new-task-form');
      UI.handleEnterKeyOnForm();
    });
  }

  static handleMainContentClick() {
    const mainContent = document.querySelector('#main-content');
    mainContent.addEventListener('click', (event) => {
      if (!event.target.closest('.task') && !event.target.closest('#add-new-task-form') && !event.target.closest('#edit-task-form')) {
        if (document.querySelector('#add-new-task-form')) {
          Task.createTask();
        } else if (document.querySelector('#edit-task-form')) {
          Task.saveEditedTask();
        }
      }
      
      const tasks = document.querySelectorAll('.task');
      const clickedElement = event.target;
      if (!clickedElement.closest('.task')) {
        tasks.forEach(t => t.classList.remove('selected-task'));
      }
    });
  }

  static handleKeyBoardTaskDeleting() {
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Delete' || event.key === 'Backspace') {
          const selectedTask = document.querySelector('.selected-task'); // Находим задачу с классом .selected
          if (selectedTask) { // Если такая задача есть
            Task.deleteTask(selectedTask);
          }
        }
      });
  }

  // Function to convert RGB color to HEX format
  static rgbToHex(rgb) {
    // Check if the input is in the correct RGB format
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
      // Return default color or handle the error accordingly
      return "000000"; // Default to black color
    }

    // Convert each RGB component to HEX format
    const [, r, g, b] = match;
    const hexColor = (
      (1 << 24) +
      (parseInt(r) << 16) +
      (parseInt(g) << 8) +
      parseInt(b)
    )
      .toString(16)
      .slice(1);

    return hexColor;
  }

  static resetAll() {
    const heading = document.querySelector("h2");
    heading.textContent = "";
    const mainContent = document.querySelector("#main-content");
    mainContent.innerHTML = "";
  }

  static updateHeading(clickedList) {
    const text = clickedList.querySelector(".text");
    const heading = document.querySelector("h2");
    heading.textContent = text.textContent;
  }

  static resetTilesColors() {
    const allTiles = document.querySelectorAll(".tile");
    allTiles.forEach((tile) => {
      tile.classList.remove(
        "today-tile-clicked",
        "week-tile-clicked",
        "all-tile-clicked",
        "important-tile-clicked",
        "list-clicked"
      );

      const tileIcon = tile.querySelector(".material-symbols-outlined");
      const tileDigit = tile.querySelector(".digit");

      tileIcon.style.background = "";
      tileIcon.style.color = "white";
      tileDigit.style.color = "";
    });
  }

  static changeTileColor(clickedTile) {
    UI.resetTilesColors();

    if (clickedTile.classList.contains("tile")) {
      clickedTile.classList.add(`${clickedTile.id}-tile-clicked`);

      const tileIcon = clickedTile.querySelector(".material-symbols-outlined");
      const tileDigit = clickedTile.querySelector(".digit");

      if (tileIcon) {
        tileIcon.style.background = "white";
        tileIcon.style.color = "white";

        switch (clickedTile.id) {
          case "today":
            tileIcon.style.color = "var(--blue)";
            break;
          case "week":
            tileIcon.style.color = "var(--red)";
            break;
          case "all":
            tileIcon.style.color = "var(--dark-gray)";
            break;
          case "important":
            tileIcon.style.color = "var(--orange)";
            break;
          default:
            break;
        }
      }

      if (tileDigit) {
        tileDigit.style.color = "white";
      }
    } else if (clickedTile.classList.contains("list-item")) {
      clickedTile.classList.add("list-clicked");

      const tileIcon = clickedTile.querySelector(".material-symbols-outlined");
      if (tileIcon) {
        tileIcon.style.background = "white";
        tileIcon.style.color = "white";
      }
    }
  }

  static resetMyLists(listContainer) {
    listContainer.innerHTML = "";
  }

  static displayMyLists() {
    const sidebar = document.querySelector("#sidebar");
    let listContainer = document.querySelector("#list-container");

    if (!listContainer) {
      listContainer = document.createElement("div");
      listContainer.id = "list-container";
      sidebar.appendChild(listContainer);
    } else {
      UI.resetMyLists(listContainer);
    }

    const listsHeading = document.createElement("p");
    listsHeading.textContent = "My lists";
    listsHeading.classList.add("my-lists-heading");

    sidebar.appendChild(listContainer);
    listContainer.appendChild(listsHeading);

    todo.lists.forEach((list) =>
      ElementsCreator.createListDiv(list, listContainer)
    );
  }

  static resetListsColors() {
    let lists = document.querySelectorAll(".list-item");
    lists.forEach((list) => list.classList.remove("list-clicked"));
  }

  static changeListColor(clickedList) {
    UI.resetTilesColors();
    UI.resetListsColors();
    clickedList.classList.add("list-clicked");
  }

  static updateTaskListInMainContent(list) {
    const mainContent = document.querySelector("#main-content");
    mainContent.innerHTML = "";
    list.tasks.forEach((task) => ElementsCreator.createTaskDiv(task));
  }

  static handleEnterKeyOnForm() {
    const formElement = document.querySelector("#add-new-task-form");

    formElement.addEventListener("keypress", function (event) {
      // Проверяем, была ли нажата клавиша Enter
      if (event.key === "Enter") {
        event.preventDefault(); // Предотвращаем стандартное действие формы

        Task.createTask();

        // Создаем новую пустую форму таски
        ElementsCreator.createNewTaskForm("add-new-task-form");

        // Вешаем на новую форму слушатель Enter
        UI.handleEnterKeyOnForm();
      }
    });
  }

  static showPlusElement() {
    const plusAddTaskElement = document.querySelector(".plus");
    plusAddTaskElement.classList.remove("hide");
  }

  static hidePlusElement() {
    const plusAddTaskElement = document.querySelector(".plus");
    plusAddTaskElement.classList.add("hide");
  }

  static makeNewListActive(newList) {
    const listItems = document.querySelectorAll(".list-item");

    listItems.forEach((listItem) => {
      const dataId = listItem.getAttribute("data-id");

      if (dataId === newList.id) {
        UI.showPlusElement();
        UI.updateHeading(listItem);
        UI.changeListColor(listItem);
        UI.updateTaskListInMainContent(newList);
      }
    });
  }

  static changeTaskNameColor(formWrapper) {
    if (formWrapper) {
      const firstDivInsideTask = formWrapper.querySelector("div:first-child"); // Находим первый div внутри 'task'
      if (firstDivInsideTask) {
        firstDivInsideTask.classList.toggle("gray-crossed"); // Добавляем класс 'gray-crossed' к первому div внутри 'task'
      }
    }
  }

  static changeColorOfDoneButtonOnClick(doneBtn) {
    doneBtn.classList.toggle("radio-btn-clicked");
    const formWrapper = event.target.closest(".task"); // Находим ближайший родительский элемент с классом 'task'
    UI.changeTaskNameColor(formWrapper);
  }

  static changeColorOfImportantButtonOnClick(importantBtn) {
    importantBtn.classList.toggle("important-btn-clicked");
  }

  static highlightSelectedTask(formWrapper) {
    const tasks = document.querySelectorAll(".task");
    tasks.forEach((t) => t.classList.remove("selected-task"));
    formWrapper.classList.add("selected-task");
  }

  static deleteTaskDiv(selectedTask) {
    selectedTask.remove();
  }
}
