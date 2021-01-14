import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoDashboardComponent } from './todo-dashboard/todo-dashboard.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { rootReducer, IAppState, DEFAULT_STATE } from './store/store';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdComponentsModule } from './md-components/md-components.module';


@NgModule({
  declarations: [
    AppComponent,
    TodoDashboardComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  //https://medium.com/better-programming/understanding-typescript-type-inference-4c25f9777e9e
  constructor(ngRedux: NgRedux<IAppState>){
    ngRedux.configureStore(rootReducer, DEFAULT_STATE);
  }

}
