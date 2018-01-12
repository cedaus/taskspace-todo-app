export class Task {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  completed: boolean;

  constructor (obj) {
    this.id = obj['id'];
    this.categoryId = obj['category_id'];
    this.title = obj['title'];
    this.description = obj['description'];
    this.completed = obj['completed'];
  }
}

export class ReverseTask {
  id: number;
  category_id: number;
  title: string;
  description: string;
  completed: boolean;

  constructor (obj) {
    this.id = obj['id'];
    this.category_id = obj['categoryId'];
    this.title = obj['title'];
    this.description = obj['description'];
    this.completed = obj['completed'];
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
