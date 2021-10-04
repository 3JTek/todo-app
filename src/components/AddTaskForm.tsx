import React, {FC} from "react"
import {Form, FormProps, InputOnChangeData} from "semantic-ui-react"

const AddTaskForm = (props: IProps) => (
  <Form onSubmit={props.handleNewTaskSubmit}>
    <Form.Group>
      <Form.Input
        widths={12}
        placeholder="Type here..."
        name="newTask"
        value={props.newTask}
        onChange={props.handleNewTaskChange}
      />

      <Form.Button type="submit" primary content="Add task" />
    </Form.Group>
  </Form>
)

interface IProps {
  newTask: string
  handleNewTaskChange: (e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void
  handleNewTaskSubmit: (event: React.FormEvent<HTMLFormElement>, data: FormProps) => void
}

export default AddTaskForm
