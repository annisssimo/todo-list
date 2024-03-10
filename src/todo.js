class ToDo {
    constructor () {
        this.tiles = [];
    }

    addTile(newTile) {
        return this.tiles.push(newTile);
    }
}

const todo = new ToDo();

export default todo;