import { Reducer } from "redux";
import { tassign } from "tassign";
import { ActionTypes, MyAction } from "./actions";

export interface Todo{
    todoContent     : string;
    createTimeStamp : Date;
    todoDone        : boolean;
}

export interface IAppState{
    todoArray : Todo[];
    updateTimeStamp : Date;
} 

export const DEFAULT_STATE : IAppState = { 
                                    todoArray : [],
                                    updateTimeStamp: new Date()
                                };

export const rootReducer: Reducer = function (state:IAppState, action:ActionTypes): IAppState{
    switch(action.type){
        case MyAction.INITIAL_STATE : {
            return tassign(state, DEFAULT_STATE);
        } 

        case MyAction.REMOVE_ALL : {
            return tassign(state, DEFAULT_STATE);
        }

        case MyAction.ADD_TODO : {
            let addedTodo = action.element;

            return tassign(state, {
                todoArray : (state.todoArray).concat(addedTodo as Todo),
                updateTimeStamp : new Date(),
            });
        }

        case MyAction.REMOVE_TODO : {
            let removeTODO = action.element;
            let currentArray : Todo[] = (state.todoArray);
            let index : number = currentArray.indexOf(removeTODO as Todo); 

            if(index > -1)
                currentArray.splice(index,1);

            return tassign(state,{
                todoArray : currentArray,
                updateTimeStamp : new Date(),
            });
            
        }

        case MyAction.DONE_TODO :{
            let strikedTodo = action.element;
            let currentArray : Todo[] =(state.todoArray);
            let index : number = currentArray.indexOf(strikedTodo as Todo); 
            
            currentArray[index] = strikedTodo as Todo;

            return tassign(state,{
                todoArray : currentArray,
                updateTimeStamp : new Date(),
            });
        }

        default : return state;
    }
}