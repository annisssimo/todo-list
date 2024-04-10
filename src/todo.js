import { allList } from './list';

class ToDo {
    constructor () {
        this.lists = [];
    }

    addList(list) {
        return this.lists.push(list);
    }

    deleteList(list) {
        const index = this.lists.indexOf(list);
        if (index !== -1) {
            this.lists.splice(index, 1); // Remove the list from the array
        }
    }

    updateAllTasksList() {
        allList.tasks = [];
        this.lists.forEach(list => {
            list.tasks.forEach(task => {
                task.addToAllTasksList();
            });
        });
    }
}

const todo = new ToDo();

export default todo;