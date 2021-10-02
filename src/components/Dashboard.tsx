import React from "react"
import {Statistic} from "semantic-ui-react"

const Dashboard = (props: IProps) => {
  const numberOfTask: number = props.tasks.length
  const numberOfTaskCompleted: number = props.tasks.filter((task) => task.completed).length

  return (
    <>
      <Statistic size="mini" inverted>
        <Statistic.Value>{numberOfTaskCompleted}</Statistic.Value>
        <Statistic.Label>Completed</Statistic.Label>
      </Statistic>

      <Statistic size="mini" inverted>
        <Statistic.Value>{numberOfTask}</Statistic.Value>
        <Statistic.Label>Total</Statistic.Label>
      </Statistic>
    </>
  )
}

interface IProps {
  tasks: ITask[]
}

export default Dashboard
