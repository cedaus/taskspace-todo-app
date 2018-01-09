import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../_core/services/task.service';
// PROJECT

@Component({
  selector: 'app-task-lists',
  templateUrl: './task-lists.component.html',
  styleUrls: []
})

export class TaskListsComponent implements OnInit {
  selected_category_id = 1;
  completed_tasks = [];
  incompleted_tasks = [];
  showCompleted = false;

  // Errors, Modals, Loaders
  error = null;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getTasksForCategory(this.selected_category_id).subscribe((res) => {
      this.completed_tasks = this.segregateTasks(res['tasks'], true);
      this.incompleted_tasks = this.segregateTasks(res['tasks'], false);
    }, err => {});
  }

  segregateTasks(tasks, completed: boolean) {
    return tasks.filter(function(task) {
      return task.completed === completed;
    });
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

  //
  postToggleTask(task) {
    if (task.completed) {
      this.completed_tasks.push(task);
      this.incompleted_tasks = this.incompleted_tasks.filter(item => {
        return item.id !== task.id;
      });
    } else {
      this.incompleted_tasks.push(task);
      this.completed_tasks = this.completed_tasks.filter(item => {
          return item.id !== task.id;
      });
    }
  }
  postDeleteTask(task) {
    if (task.completed) {
      this.completed_tasks = this.completed_tasks.filter(item => {
          return item.id !== task.id;
      });
    } else {
      this.incompleted_tasks = this.incompleted_tasks.filter(item => {
        return item.id !== task.id;
      });
    }
  }
}
