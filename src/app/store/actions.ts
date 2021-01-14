import { AnyAction } from "redux";
import { Todo } from "./store";

export interface ActionTypes extends AnyAction{
  type: MyAction,
  element ?: Todo
}

export enum MyAction{
  ADD_TODO        = 'ADDED',
  INITIAL_STATE   = 'INITIAL_STATE',
  REMOVE_ALL      = 'REMOVE_ALL',
  REMOVE_TODO     = 'REMOVED',
  DONE_TODO       = 'DONE'
}
