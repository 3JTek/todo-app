import React from "react"
import {Button, Checkbox, CheckboxProps, DropdownProps, Select, Table} from "semantic-ui-react"

import {ITask} from "../contexts/TodoProvider"

const priorityList = [
  {key: 1, value: 1, text: "High"},
  {key: 2, value: 2, text: "Medium"},
  {key: 3, value: 3, text: "Low"},
]

const ToDoList = (props: IProps) => (
  <Table inverted sortable celled fixed textAlign="center">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell sorted={props.nameASCSorting ? "ascending" : "descending"} onClick={props.toggleNameSorting}>
          Name
        </Table.HeaderCell>
        <Table.HeaderCell>Priority</Table.HeaderCell>
        <Table.HeaderCell>Completed</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {props.tasks.map((task: any) => (
        <Table.Row key={task.id}>
          <Table.Cell>{task.name}</Table.Cell>
          <Table.Cell style={{overflow: "none"}}>
            <Select
              placeholder="Priority"
              options={priorityList}
              value={task.priority}
              onChange={(e: any, data: DropdownProps) => props.handleChangePriority(data, task.id)}
            />
          </Table.Cell>
          <Table.Cell>
            <Checkbox
              checked={task.completed}
              onClick={(e: any, data: CheckboxProps) => props.toggleComplete(data, task.id)}
            />
          </Table.Cell>
          <Table.Cell>
            <Button inverted color="red" onClick={() => props.handleDelete(task.id)}>
              Delete
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

interface IProps {
  tasks: ITask[]
  nameASCSorting: boolean
  toggleNameSorting: () => void
  handleChangePriority: (arg1: DropdownProps, arg2: string) => void
  toggleComplete: (arg1: CheckboxProps, arg2: string) => void
  handleDelete: (arg1: string) => void
}

export default ToDoList
