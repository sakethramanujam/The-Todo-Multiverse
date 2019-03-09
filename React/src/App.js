import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, CardText, Col, Container, Form, FormGroup, Input, Row } from "reactstrap";
import "./App.css";

class App extends Component {
  state = {
    tasks: [
      {
        id: 1,
        text: "Visit China",
        type: "done"
      },
      {
        id: 2,
        text: "Visit Singapore",
        type: "todo"
      },
      {
        id: 3,
        text: "Visit Maldives",
        type: "done"
      },
      {
        id: 4,
        text: "Visit Vietnam",
        type: "todo"
      },
      {
        id: 5,
        text: "Visit Japan",
        type: "todo"
      }
    ]
  };

  onNewTodo = e => {
    e.preventDefault();

    let { tasks } = this.state;
    const newTask = {
      id: tasks.length + 1,
      text: this.newTaskField.value,
      type: "todo"
    };
    this.NewForm.reset();
    tasks.push(newTask);
    this.setState({ tasks });
  };

  changeEditField = ({ id, text }) => {
    let { tasks } = this.state;

    tasks.forEach(task => {
      if (task.id === id) {
        task.text = text;
      }
    });

    this.setState({ tasks });
  };

  finishTodo = id => {
    const { tasks } = this.state;
    tasks.forEach(task => {
      if (task.id === id) {
        task["type"] = "done";
      }
    });
    this.setState({ tasks });
  };

  deleteTodo = id => {
    let { tasks } = this.state;

    tasks = tasks.filter(task => {
      return task.id !== id;
    });

    this.setState({ tasks });
  };

  render() {
    const todos = [];
    const dones = [];
    this.state.tasks.forEach(task => {
      task.type === "todo"
        ? todos.push(
            <Card key={task.id}>
              <CardBody>
                <CardText tag="div">
                  <Row>
                    <Col>
                      <Input
                        defaultValue={task.text}
                        onChange={e =>
                          this.changeEditField({
                            id: task.id,
                            text: e.target.value
                          })
                        }
                        type="text"
                      />
                    </Col>
                    <Col sm="2">
                      <Button
                        onClick={() => this.finishTodo(task.id)}
                        color="success"
                      >
                        <i className="material-icons">check</i>
                      </Button>
                    </Col>
                  </Row>
                </CardText>
              </CardBody>
            </Card>
          )
        : dones.push(
            <Card key={task.id}>
              <CardBody>
                <CardText tag="div">
                  <Row>
                    <Col>
                      <Input
                        className="dones"
                        defaultValue={task.text}
                        onChange={e =>
                          this.changeEditField({
                            id: task.id,
                            text: e.target.value
                          })
                        }
                        type="text"
                      />
                    </Col>
                    <Col sm="2">
                      <Button
                        onClick={() => this.deleteTodo(task.id)}
                        color="danger"
                      >
                        <i className="material-icons">delete</i>
                      </Button>
                    </Col>
                  </Row>
                </CardText>
              </CardBody>
            </Card>
          );
    });
    return (
      <div className="App">
        <header className="App-header">
          React TODO
          <h4>
            by Rakesh Peela (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/rakhi2104"
            >
              rakhi2104
            </a>
            )
          </h4>
        </header>

        <br />

        <Container>
          <Container>
            <Form innerRef={o => (this.NewForm = o)} onSubmit={this.onNewTodo}>
              <FormGroup>
                <Card>
                  <CardBody>
                    <CardText tag="div">
                      <Row>
                        <Col>
                          <Input
                            type="text"
                            id="addTodo"
                            innerRef={o => (this.newTaskField = o)}
                            placeholder="add task to TODO list"
                          />
                        </Col>
                        <Col sm="3">
                          <Button type="submit"> Add New Task</Button>
                        </Col>
                      </Row>
                    </CardText>
                  </CardBody>
                </Card>
              </FormGroup>
            </Form>
          </Container>
          
          <br />

          <Row>
            <Col>
              <Card>
                <CardHeader>TODO</CardHeader>
                <CardBody className="limitHeight">
                  {todos.length > 0 ? (
                    todos
                  ) : (
                    <h5>Yay, you're caught up with everything</h5>
                  )}
                </CardBody>
              </Card>
            </Col>

            <Col>
              <Card>
                <CardHeader>COMPLETED</CardHeader>
                <CardBody className="limitHeight">
                  {dones.length > 0 ? dones : <h5>Hmmm...</h5>}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
