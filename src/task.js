import {parse} from 'date-fns';

export class Task {
  constructor(isDone, title, description, dueDate, isImportant) {
    this.isDone = isDone;
    this.title = title;
    this.description = description;
    this.dueDate = parse(dueDate, 'dd.MM.yyyy', new Date());
    this.isImportant = isImportant;
  }
}