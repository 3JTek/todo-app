import React, {FC} from "react"
import {Menu} from "semantic-ui-react"

const PriorityFilter = (props: IProps) => (
  <Menu pointing secondary inverted>
    <Menu.Item name="All task" active={!props.priorityFilter} onClick={() => props.setPriorityFilter(null)} />
    <Menu.Item name="High" active={props.priorityFilter === 1} onClick={() => props.setPriorityFilter(1)} />
    <Menu.Item name="Medium" active={props.priorityFilter === 2} onClick={() => props.setPriorityFilter(2)} />
    <Menu.Item name="Low" active={props.priorityFilter === 3} onClick={() => props.setPriorityFilter(3)} />
  </Menu>
)

interface IProps {
  priorityFilter: PriorityOpts | null
  setPriorityFilter: (args: PriorityOpts | null) => void
}

export default PriorityFilter
