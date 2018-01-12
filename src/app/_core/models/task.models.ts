export class Task {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  completed: boolean;
  important: boolean;

  constructor (obj) {
    this.id = obj['id'];
    this.categoryId = obj['category_id'];
    this.title = obj['title'];
    this.description = obj['description'];
    this.completed = obj['completed'];
    this.important = obj['important'] || false;
  }
}

export class ReverseTask {
  id: number;
  category_id: number;
  title: string;
  description: string;
  completed: boolean;
  important: boolean;

  constructor (obj) {
    this.id = obj['id'];
    this.category_id = obj['categoryId'];
    this.title = obj['title'];
    this.description = obj['description'];
    this.completed = obj['completed'];
    this.important = obj['important'];
  }
}

export class TaskCategory {
  id: number;
  name: string;

  constructor(obj) {
    this.id = obj['id'];
    this.name = obj['name'];
  }
}
