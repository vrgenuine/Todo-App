import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, Todo } from '../store/store';
import { MyAction } from '../store/actions';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.css']
})
export class TodoDashboardComponent {
  @select('todoUpdateCount') todoUpdateCount!: Observable<number>;
  @select('todoArray') todoArray !:Observable<Todo[]>; 
  @select('updateTimeStamp') updateTimeStamp !: Observable<Date>;
  
  myContent !: Todo[];
  
  constructor(private ngRedux: NgRedux<IAppState>,private snackBar: MatSnackBar)
  {
    this.todoArray.subscribe((content:Todo[]) => {
      this.myContent = content;
    });
  }
  
  emptyTodoList(){
    if(this.myContent.length <= 0)
      this.openSnackBar("Oops! Looks like you are already done","Nothing to Remove");
    else
    { 
      this.openSnackBar("Great All Done!","All Removed");
      this.ngRedux.dispatch({type: MyAction.REMOVE_ALL });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
