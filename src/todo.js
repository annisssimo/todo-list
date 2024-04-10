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
}

const todo = new ToDo();

export default todo;