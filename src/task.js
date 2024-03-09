import {parse} from 'date-fns';

class Task {
    constructor(title, description, dueDate, isImportant) {
      this.title = title;
      this.description = description;
      this.dueDate = parse(dueDate, 'dd.MM.yyyy', new Date());
      this.isImportant = isImportant;
    }
}

const task1 = new Task('clean the home', 'with Yarik', '08.03.2024', true);

export default task1;