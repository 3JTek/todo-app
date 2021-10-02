import {ITodoContext} from "../contexts/TodoProvider"

import {v4 as uuidv4} from "uuid"

const useTodoReducer = (state: ITodoContext, action: IAction) => {
  switch (action.type) {
    case "UPDATE NEW TASK": {
      return {...state, newTask: action.payload}
    }

    case "ADD NEW TASK": {
      const task = {id: uuidv4(), name: state.newTask, priority: 2, completed: false}
      return {...state, newTask: "", tasks: [task, ...state.tasks], priorityFilter: null}
    }

    case "DELETE TASK": {
      const newTaskArr = state.tasks.filter((task) => task.id !== action.payload)
      return {...state, tasks: newTaskArr}
    }

    case "TOGGLE COMPLETE": {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.taskId)

      const newTaskArr = [...state.tasks]

      newTaskArr[taskIndex].completed = action.payload.checked

      return {...state, tasks: newTaskArr}
    }

    case "CHANGE PRIORITY": {
      const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.taskId)

      const newTaskArr = [...state.tasks]

      newTaskArr[taskIndex].priority = action.payload.value

      return {...state, tasks: newTaskArr}
    }
    //TODO
    case "SORT BY NAME": {
      return {...state, nameASCSorting: !state.nameASCSorting}
    }

    case "FILTER BY PRIORITY": {
      return {...state, priorityFilter: action.payload}
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export interface IAction {
  type:
    | "UPDATE NEW TASK"
    | "ADD NEW TASK"
    | "DELETE TASK"
    | "TOGGLE COMPLETE"
    | "CHANGE PRIORITY"
    | "SORT BY NAME"
    | "FILTER BY PRIORITY"
  payload?: any
}

export default useTodoReducer
