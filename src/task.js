class Task {
    constructor(title, description, dueDate, priority) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
    }
}

const task1 = new Task('clean the home', 'with Yarik', '09.03.2024', 'low');

export default task1;