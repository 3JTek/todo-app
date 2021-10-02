/// <reference types="react-scripts" />

interface ITask {
  id: string
  name: string
  priority: number
  completed: boolean
}

type PriorityOpts = 1 | 2 | 3

type SortingOpts = "ascending" | "descending"
