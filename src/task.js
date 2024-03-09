import {parse} from 'date-fns';

class Task {
    constructor(title, description, dueDate, priority) {
      this.title = title;
      this.description = description;
      this.dueDate = parse(dueDate, 'dd.MM.yyyy', new Date());
      this.priority = priority;
    }
}

const task1 = new Task('clean the home', 'with Yarik', '08.03.2024', 'low');

export default task1;