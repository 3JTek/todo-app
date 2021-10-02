import React, {FC, useState} from "react"
import {v4 as uuidv4} from "uuid"

import {
  Button,
  Checkbox,
  Table,
  CheckboxProps,
  Container,
  Divider,
  DropdownProps,
  Form,
  FormProps,
  Grid,
  Header,
  InputOnChangeData,
  Select,
  Statistic,
  Menu,
} from "semantic-ui-react"

const priorityList = [
  {key: 1, value: 1, text: "High"},
  {key: 2, value: 2, text: "Medium"},
  {key: 3, value: 3, text: "Minor"},
]

const initialTasks = [
  {id: uuidv4(), name: "First task", priority: 2, completed: false},
  {id: uuidv4(), name: "Second task", priority: 1, completed: true},
  {id: uuidv4(), name: "Third task", priority: 1, completed: false},
  {id: uuidv4(), name: "Third task", priority: 3, completed: true},
]

const App: FC = (): JSX.Element => {
  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks] = useState<ITask[]>(initialTasks)
  const [priorityFilter, setPriorityFilter] = useState<PrioritiesOpts | null>(null)
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

  const numberOfTask: number = tasksFilteredAndSorted.length
  const numberOfTaskCompleted: number = tasksFilteredAndSorted.filter((task) => task.completed).length

  console.log("Rendering App", tasksFilteredAndSorted)

  return (
    <div style={{height: "100vh", backgroundColor: "#282c34"}}>
      <header>
        <nav>
          <Header inverted textAlign="center" as="h1">
            🔥THE🔥 todo List
          </Header>
          <Divider />
        </nav>
      </header>

      <main>
        <Container style={{margin: "20rem 0"}}>
          <Grid columns="2">
            <Grid.Column>
              <Form onSubmit={handleNewTaskSubmit}>
                <Form.Group>
                  <Form.Input
                    widths={12}
                    placeholder="Listen to my client's needs"
                    name="newTask"
                    value={newTask}
                    onChange={handleNewTaskChange}
                  />

                  <Form.Button type="submit" primary content="Add task" />
                </Form.Group>
              </Form>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Statistic size="mini" inverted>
                <Statistic.Value>{numberOfTaskCompleted}</Statistic.Value>
                <Statistic.Label>Completed</Statistic.Label>
              </Statistic>

              <Statistic size="mini" inverted>
                <Statistic.Value>{numberOfTask}</Statistic.Value>
                <Statistic.Label>Total</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid>

          <Menu pointing secondary inverted>
            <Menu.Item name="All task" active={!priorityFilter} onClick={() => setPriorityFilter(null)} />
            <Menu.Item name="High" active={priorityFilter === 1} onClick={() => setPriorityFilter(1)} />
            <Menu.Item name="Medium" active={priorityFilter === 2} onClick={() => setPriorityFilter(2)} />
            <Menu.Item name="Low" active={priorityFilter === 3} onClick={() => setPriorityFilter(3)} />
          </Menu>
          <Table inverted sortable celled fixed textAlign="center">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell sorted={nameSorting} onClick={toggleNameSorting}>
                  Name
                </Table.HeaderCell>
                <Table.HeaderCell>Priority</Table.HeaderCell>
                <Table.HeaderCell>Completed</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tasksFilteredAndSorted.map((task: any) => (
                <Table.Row key={task.id}>
                  <Table.Cell>{task.name}</Table.Cell>
                  <Table.Cell>
                    <Select
                      placeholder="Priority"
                      options={priorityList}
                      value={task.priority}
                      onChange={(e: any, data: DropdownProps) => handleChangePriority(data, task.id)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Checkbox
                      checked={task.completed}
                      onClick={(e: any, data: CheckboxProps) => toggleComplete(data, task.id)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Button inverted color="red" onClick={() => handleDelete(task.id)}>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
      </main>
      <footer>
        <Divider />
        <Header inverted as="h5" textAlign="center">
          Made with 💙 by 3JTEK
        </Header>
      </footer>
    </div>
  )
}

type PrioritiesOpts = 1 | 2 | 3

type SortingOpts = "ascending" | "descending"

interface ITask {
  id: string
  name: string
  priority: number
  completed: boolean
}

export default App
