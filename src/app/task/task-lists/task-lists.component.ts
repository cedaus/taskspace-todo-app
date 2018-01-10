import {Component, OnInit} from '@angular/core';
// PROJECT
import {TaskService} from '../../_core/services/task.service';
import {Task, ReverseTask} from '../../_core/models/task.models';

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: []
})

export class TaskListsComponent implements OnInit {
  selected_category_id = 1;
  completedTasks: Task[] = [];
  incompletedTasks: Task[] = [];
  task: Task = new Task({});
  // Toggles
  showCompleted = false;
  taskInfo: boolean = false;

  // Errors, Modals, Loaders
  error = null;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getTasksForCategory(this.selected_category_id).subscribe((res) => {
      this.completedTasks = this.segregateTasks(res['tasks'], true);
      this.incompletedTasks = this.segregateTasks(res['tasks'], false);
    }, err => {
      this.error = err;
    });
  }

  segregateTasks(tasks, completed: boolean) {
    return tasks.filter(function(task) {
      return task.completed === completed;
    });
  }

  // Button Triggers
  add() {
    this.taskInfo = true;
  }
  close() {
    this.taskInfo = false;
  }

  // Actions on Tasks
  toggleTask(task) {
    const context = {task_id: task.id, completed: !task.completed};
    this.taskService.updateTask(task.id, context).subscribe(res => {
      this.postToggleTask(res);
    }, err => {
      this.error = err;
    });
  }
  deleteTask(task) {
    this.taskService.deleteTask(task.id).subscribe(res => {
      this.postDeleteTask(task);
    }, err => {
      this.error = err;
    });
  }
  saveTask() {
    this.task['categoryId'] = this.selected_category_id;
    const context = new ReverseTask(this.task);
    this.taskService.createTask(null, context).subscribe(res => {
      console.log(res);
    }, err => {
      this.error = err;
    });
  }

  // Post Actions
  postToggleTask(task) {
    if (task.completed) {
      this.completedTasks.push(task);
      this.incompletedTasks = this.incompletedTasks.filter(item => {
        return item.id !== task.id;
      });
    } else {
      this.incompletedTasks.push(task);
      this.completedTasks = this.completedTasks.filter(item => {
          return item.id !== task.id;
      });
    }
  }
  postDeleteTask(task) {
    if (task.completed) {
      this.completedTasks = this.completedTasks.filter(item => {
          return item.id !== task.id;
      });
    } else {
      this.incompletedTasks = this.incompletedTasks.filter(item => {
        return item.id !== task.id;
      });
    }
  }
}
