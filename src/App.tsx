import React, {FC, useState} from "react"
import {v4 as uuidv4} from "uuid"

import {CheckboxProps, Container, DropdownProps, FormProps, Grid, InputOnChangeData} from "semantic-ui-react"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import AddTaskForm from "./components/AddTaskForm"
import Dashboard from "./components/Dashboard"
import PriorityFilter from "./components/PriorityFilter"
import ToDoList from "./components/ToDoList"

const initialTasks = [
  {id: uuidv4(), name: "First task", priority: 2, completed: false},
  {id: uuidv4(), name: "Second task", priority: 1, completed: true},
  {id: uuidv4(), name: "Third task", priority: 1, completed: false},
  {id: uuidv4(), name: "Third task", priority: 3, completed: true},
]

const App: FC = (): JSX.Element => {
  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks] = useState<ITask[]>(initialTasks)
  const [priorityFilter, setPriorityFilter] = useState<PriorityOpts | null>(null)
  const [nameSorting, setNameSorting] = useState<SortingOpts | undefined>("ascending")

  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setNewTask(data.value)
  }

  const handleNewTaskSubmit = (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
    if (!newTask) return
    setNewTask("")
    setTasks((prevState) => [{id: uuidv4(), name: newTask, priority: 2, completed: false}, ...prevState])
  }

  const handleDelete = (taskId: string) => {
    const newTaskArr: ITask[] = tasks.filter((task) => task.id !== taskId)
    setTasks(newTaskArr)
  }

  const toggleComplete = (data: CheckboxProps, taskId: string) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId)

    if (taskIndex === -1) return

    const newTaskArr = [...tasks]
    newTaskArr[taskIndex].completed = Boolean(data.checked)

    setTasks(newTaskArr)
  }

  const handleChangePriority = (data: DropdownProps, taskId: string) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId)

    if (taskIndex === -1) return

    const newTaskArr = [...tasks]
    newTaskArr[taskIndex].priority = Number(data.value)

    setTasks(newTaskArr)
  }

  const toggleNameSorting = () =>
    setNameSorting((prevState) => ([undefined, "descending"].includes(prevState) ? "ascending" : "descending"))

  const filterByPriority = (tasks: ITask[]) => {
    if (!priorityFilter) return tasks
    else return tasks.filter((task) => task.priority === priorityFilter)
  }

  const sortByName = (tasks: ITask[]) => {
    if (nameSorting === "ascending") return tasks.sort((a, b) => (a.name > b.name ? 1 : -1))
    else if (nameSorting === "descending") return tasks.sort((a, b) => (a.name > b.name ? -1 : 1))
    return tasks
  }

  const compose =
    (f: Function, g: Function) =>
    (...args: any) =>
      f(g(...args))

  const processTasks = (...fns: Function[]) => fns.reduce(compose)

  const tasksFilteredAndSorted: ITask[] = processTasks(filterByPriority, sortByName)(tasks)

  console.log("Rendering App", tasksFilteredAndSorted)

  return (
    <div style={{height: "100vh", backgroundColor: "#282c34"}}>
      <header>
        <Nav></Nav>
      </header>

      <main>
        <Container style={{margin: "20rem 0"}}>
          <Grid columns="2">
            <Grid.Column>
              <AddTaskForm
                newTask={newTask}
                handleNewTaskChange={handleNewTaskChange}
                handleNewTaskSubmit={handleNewTaskSubmit}
              ></AddTaskForm>
            </Grid.Column>

            <Grid.Column textAlign="right">
              <Dashboard tasks={tasksFilteredAndSorted}></Dashboard>
            </Grid.Column>
          </Grid>

          <PriorityFilter priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}></PriorityFilter>

          <ToDoList
            tasks={tasksFilteredAndSorted}
            nameSorting={nameSorting}
            toggleNameSorting={toggleNameSorting}
            handleChangePriority={handleChangePriority}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
          ></ToDoList>
        </Container>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  )
}

export default App
