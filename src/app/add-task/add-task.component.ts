import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toDoService: ToDoService
  ) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      novaTask: [null, [Validators.required]]
    });
  }
  onSubmit(){
    // console.log(this.taskForm);
    // console.log(this.taskForm.get("novaTask")?.value);
    if(this.taskForm.valid){
      this.toDoService.addTask(this.taskForm.value);
      this.taskForm.reset();
    }
  }
}
