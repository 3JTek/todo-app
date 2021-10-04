// import React from "react"
import "@testing-library/jest-dom"

import {render, fireEvent} from "@testing-library/react"

import {TodoProvider} from "./contexts/TodoProvider"
import App from "./App"

const WrappedAppComponent = (
  <TodoProvider>
    <App></App>
  </TodoProvider>
)

test("Can view tasks", async () => {
  const screen = render(WrappedAppComponent)

  const firstTask = screen.getByText("First task")
  expect(firstTask).toBeInTheDocument()

  const twoTask = screen.getByText("Second task")
  expect(twoTask).toBeInTheDocument()

  const thirdTask = screen.getByText("Third task")
  expect(thirdTask).toBeInTheDocument()

  const fourthTask = screen.getByText("Fourth task")
  expect(fourthTask).toBeInTheDocument()
})

test("Can add a task", async () => {
  const screen = render(WrappedAppComponent)

  const addNewTaskField = screen.getByPlaceholderText("Type here...")
  fireEvent.change(addNewTaskField, {target: {value: "Fifth task"}})

  const addTaskButton = screen.getByText("Add task")
  fireEvent.click(addTaskButton)

  const newTask = screen.getByText("Fifth task")
  expect(newTask).toBeInTheDocument()
})

test("Can delete task", async () => {
  const screen = render(WrappedAppComponent)

  const deleteTaskButton = screen.getAllByText("Delete")
  const firstTaskDeleteButton = deleteTaskButton[0]

  fireEvent.click(firstTaskDeleteButton)

  const firstTask = screen.getByText("First task")
  expect(firstTask).toBeNull
})

test("Can complete a task", async () => {})

test("Can view task by priority", async () => {})

test("Can sort tasks by name", async () => {})

test("Can view completed and total tasks", async () => {
  const screen = render(WrappedAppComponent)

  const completedTasks = screen.getByText("2")
  expect(completedTasks).toBeInTheDocument()

  const totalTasks = screen.getByText("4")
  expect(totalTasks).toBeInTheDocument()
})
