import React, {FC} from "react"
import {Menu} from "semantic-ui-react"

import {PriorityOpts} from "../contexts/TodoProvider"

const PriorityFilter = (props: IProps) => (
  <Menu compact pointing secondary inverted>
    <Menu.Item name="All task" active={!props.priorityFilter} onClick={() => props.handleChangePriorityFilter(null)} />
    <Menu.Item name="High" active={props.priorityFilter === 1} onClick={() => props.handleChangePriorityFilter(1)} />
    <Menu.Item name="Medium" active={props.priorityFilter === 2} onClick={() => props.handleChangePriorityFilter(2)} />
    <Menu.Item name="Low" active={props.priorityFilter === 3} onClick={() => props.handleChangePriorityFilter(3)} />
  </Menu>
)

interface IProps {
  priorityFilter: PriorityOpts | null
  handleChangePriorityFilter: (args: PriorityOpts | null) => void
}

export default PriorityFilter
