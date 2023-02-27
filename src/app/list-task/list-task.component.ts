import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/to-do.service';
import { ToDoService } from 'src/app/to-do.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  @Input() tasks: Task[] = [];
  constructor(
    private toDoService: ToDoService
  ) { }
 
  ngOnInit(): void {
  }
  setConcluido(idTask: number){
    this.toDoService.setConcluido(idTask);
  }
  removerTask(idTask: number){
    this.toDoService.removerTask(idTask);
  }
  editaTask(idTask: number, e: any){
    this.toDoService.editaTask(idTask, e.value);
  }
}
