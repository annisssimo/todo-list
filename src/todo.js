class ToDo {
    constructor () {
        this.lists = [];
    }

    addList(list) {
        return this.lists.push(list);
    }

    // addTaskToList(task, listName) {
    //     const list = this.lists.find(list => this.lists.heading === listName);
    //     list.tasks.push(task);
    // }
}

const todo = new ToDo();

export default todo;