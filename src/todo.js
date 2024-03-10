class ToDo {
    constructor () {
        this.lists = [];
    }

    addList(newList) {
        return this.lists.push(newList);
    }
}

const todo = new ToDo();

export default todo;