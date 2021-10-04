import React, {FC, useContext} from "react"

import {CheckboxProps, Container, DropdownProps, FormProps, Grid, InputOnChangeData} from "semantic-ui-react"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import AddTaskForm from "./components/AddTaskForm"
import Dashboard from "./components/Dashboard"
import PriorityFilter from "./components/PriorityFilter"
import ToDoList from "./components/ToDoList"

import {TodoContextDispatch, TodoContextState, ITask} from "./contexts/TodoProvider"

const App: FC = (): JSX.Element => {
  const {newTask, tasks, priorityFilter, nameASCSorting} = useContext(TodoContextState)
  const dispatch = useContext(TodoContextDispatch)

  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    dispatch({type: "UPDATE NEW TASK", payload: data.value})
  }

  const handleNewTaskSubmit = (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
    if (!newTask) return
    dispatch({type: "ADD NEW TASK"})
  }

  const handleDelete = (taskId: string) => {
    dispatch({type: "DELETE TASK", payload: taskId})
  }

  const toggleComplete = (data: CheckboxProps, taskId: string) => {
    dispatch({type: "TOGGLE COMPLETE", payload: {taskId, checked: Boolean(data.checked)}})
  }

  const handleChangePriority = (data: DropdownProps, taskId: string) => {
    dispatch({type: "CHANGE PRIORITY", payload: {taskId, value: Number(data.value)}})
  }

  const toggleNameSorting = () => {
    dispatch({type: "SORT BY NAME"})
  }

  const filterByPriority = (tasks: ITask[]) => {
    if (!priorityFilter) return tasks
    else return tasks.filter((task) => task.priority === priorityFilter)
  }

  const sortByName = (tasks: ITask[]) => {
    if (nameASCSorting) return tasks.sort((a, b) => (a.name > b.name ? 1 : -1))
    return tasks.sort((a, b) => (a.name > b.name ? -1 : 1))
  }

  const handleChangePriorityFilter = (priority: number | null) => {
    dispatch({type: "FILTER BY PRIORITY", payload: priority})
  }

  const compose =
    (f: Function, g: Function) =>
    (...args: any) =>
      f(g(...args))

  const processTasks = (...fns: Function[]) => fns.reduce(compose)

  const tasksFilteredAndSorted: ITask[] = processTasks(filterByPriority, sortByName)(tasks)

  return (
    <>
      <header>
        <Nav></Nav>u
      </header>

      <main>
        <Container style={{height: "inherit"}}>
          <Grid verticalAlign="middle" style={{height: "inherit"}}>
            <Grid.Column>
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column>
                    <AddTaskForm
                      newTask={newTask}
                      handleNewTaskChange={handleNewTaskChange}
                      handleNewTaskSubmit={handleNewTaskSubmit}
                    ></AddTaskForm>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={2}>
                  <Grid.Column>
                    <PriorityFilter
                      priorityFilter={priorityFilter}
                      handleChangePriorityFilter={handleChangePriorityFilter}
                    ></PriorityFilter>
                  </Grid.Column>

                  <Grid.Column textAlign="right">
                    <Dashboard tasks={tasksFilteredAndSorted}></Dashboard>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    <ToDoList
                      tasks={tasksFilteredAndSorted}
                      nameASCSorting={nameASCSorting}
                      toggleNameSorting={toggleNameSorting}
                      handleChangePriority={handleChangePriority}
                      toggleComplete={toggleComplete}
                      handleDelete={handleDelete}
                    ></ToDoList>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid>
        </Container>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </>
  )
}

export default App
