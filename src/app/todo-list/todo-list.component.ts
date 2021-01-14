import { NgRedux, select } from '@angular-redux/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppState, Todo } from '../store/store';
import { MyAction } from '../store/actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @select('todoArray') todoArrayList!: Observable<Todo[]>;
  myContent !: Todo[];

  form = new FormGroup({ 
    todoForm : new FormGroup({
      todoControl : new FormControl('',[
        Validators.required
      ])
    }) 
  });
  
  get todoControl(){
    return this.form.get('todoForm.todoControl');
  }

  get todoControlErrors(){
    return this.form.get('todoForm.todoControl')?.hasError('required','todoControl');
  }

  constructor(private ngRedux: NgRedux<IAppState>){
    this.todoArrayList.subscribe((content : Todo[])=>{
      this.myContent = content;
    });
  }

  addTodo(todoItem : HTMLInputElement){
    if(todoItem.value!="")
    {
      let todoElement: Todo = { 
          todoContent     : todoItem.value,
          createTimeStamp : new Date(),
          todoDone        : false
      };
      this.ngRedux.dispatch({type: MyAction.ADD_TODO, element: todoElement });
    }
    todoItem.value = "";
  }

  removeTodo(todoItem : Todo) {
    if(todoItem.todoContent!="")
    {
      this.ngRedux.dispatch({type: MyAction.REMOVE_TODO, element: todoItem});
    }
  }

  strikeTodo(todoItem : Todo){
    if(todoItem.todoContent!=""){
      let index = this.myContent.indexOf(todoItem);
      let toStrikeDone = this.myContent[index];
      toStrikeDone.todoDone = !toStrikeDone.todoDone;

      this.ngRedux.dispatch({type: MyAction.DONE_TODO, element: toStrikeDone});
    }
  } 
}