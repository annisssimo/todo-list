import { allList } from './list';

class ToDo {
    constructor () {
        this.lists = [];
    }

    addList(list) {
        this.lists.push(list);
        this.saveToLocalStorage();
    }

    deleteList(list) {
        const index = this.lists.indexOf(list);
        if (index !== -1) {
            this.lists.splice(index, 1); // Remove the list from the array
        }
        this.saveToLocalStorage();
    }

    updateAllTasksList() {
        allList.tasks = [];
        this.lists.forEach(list => {
            list.tasks.forEach(task => {
                task.addToAllTasksList();
            });
        });
    }

    saveToLocalStorage() {
        localStorage.setItem('todoLists', JSON.stringify(this.lists));
    }
}

const todo = new ToDo();

export default todo;