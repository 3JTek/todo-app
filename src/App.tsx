import React, { useState } from "react";

import {
  Button,
  Checkbox,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  List,
  Segment,
  Select,
  Statistic,
} from "semantic-ui-react";

const priorityList = [
  { key: 1, value: 1, text: "high" },
  { key: 2, value: 2, text: "medium" },
  { key: 3, value: 3, text: "minor" },
];

const initialTasks = [{ name: "some name", priority: 2, completed: false }];

function App() {
  const [tasks, setTasks] = useState<ITask[]>(initialTasks);

  const handleNewTaskChange = () => {};

  const handleNewTaskSubmit = () => {};

  return (
    <body style={{ height: "100vh", backgroundColor: "#282c34" }}>
      <header>
        <nav>
          <Header inverted textAlign="center" as="h1">
            🔥THE🔥 todo List
          </Header>
          <Divider />
        </nav>
      </header>

      <main>
        <Container style={{ margin: "20rem 0" }}>
          <Grid columns="2">
            <Grid.Column>
              <Form onSubmit={handleNewTaskSubmit}>
                <Form.Group>
                  <Form.Input
                    widths={12}
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleNewTaskChange}
                  />

                  <Form.Button primary content="Add task" />
                </Form.Group>
              </Form>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Statistic size="mini" inverted>
                <Statistic.Value>1</Statistic.Value>
                <Statistic.Label>Completed</Statistic.Label>
              </Statistic>

              <Statistic size="mini" inverted>
                <Statistic.Value>22</Statistic.Value>
                <Statistic.Label>Total</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid>

          <Grid columns="4" celled textAlign="center" verticalAlign="middle">
            <Grid.Row>
              <Grid.Column>
                <Header as="h4" inverted>
                  Task name
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4" inverted>
                  Priority
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4" inverted>
                  Complete
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as="h4" inverted>
                  Action
                </Header>
              </Grid.Column>
            </Grid.Row>

            {tasks.map((task) => (
              <Grid.Row key={task.name}>
                <Grid.Column>
                  <Header as="h5" inverted>
                    {task.name}
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  <Select placeholder="Priority" options={priorityList} />
                </Grid.Column>
                <Grid.Column>
                  <Checkbox />
                </Grid.Column>
                <Grid.Column>
                  <Button inverted color="red">
                    Delete
                  </Button>
                </Grid.Column>
              </Grid.Row>
            ))}
          </Grid>
        </Container>
      </main>
      <footer>
        <Divider />
        <Header inverted as="h5" textAlign="center">
          Made with 💙 by 3JTEK
        </Header>
      </footer>
    </body>
  );
}

interface ITask {
  name: string;
  priority: number; //TODO => 1 | 2 | 3;
  completed: boolean;
}

export default App;
