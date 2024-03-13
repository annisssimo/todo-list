class ToDo {
    constructor () {
        this.lists = [];
    }

    addList(list) {
        return this.lists.push(list);
    }
}

const todo = new ToDo();

export default todo;