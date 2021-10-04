/* eslint-disable react/no-unused-state */
import React, {useReducer} from "react"
import useTodoReducer from "../reducers/useTodoReducer"
import {v4 as uuidv4} from "uuid"

const initialTasks = [
  {id: uuidv4(), name: "First task", priority: 2, completed: false},
  {id: uuidv4(), name: "Second task", priority: 1, completed: true},
  {id: uuidv4(), name: "Third task", priority: 1, completed: false},
  {id: uuidv4(), name: "Fourth task", priority: 3, completed: true},
]

const initialState: ITodoContext = {tasks: initialTasks, newTask: "", priorityFilter: null, nameASCSorting: false}

export const TodoContextState = React.createContext(initialState)
export const TodoContextDispatch = React.createContext<any>(null)

export const TodoProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(useTodoReducer, initialState)

  return (
    <TodoContextState.Provider value={{...state}}>
      <TodoContextDispatch.Provider value={dispatch}>{children}</TodoContextDispatch.Provider>
    </TodoContextState.Provider>
  )
}

export interface ITask {
  id: string
  name: string
  priority: number
  completed: boolean
}

export type PriorityOpts = 1 | 2 | 3

export interface ITodoContext {
  newTask: string
  tasks: ITask[]
  priorityFilter: PriorityOpts | null
  nameASCSorting: boolean
}

interface Props {
  children: JSX.Element
}
