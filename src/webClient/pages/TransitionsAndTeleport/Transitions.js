import React from "react";
import { Heading, Box, Button, Border } from "../../components";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Transition from "react-transition-group/Transition";
import { injectGlobal } from "styled-components";
import Waypoint from "react-waypoint";

injectGlobal`
  .fade-entering {
    opacity: 0;
    z-index: 1;
  }
  .fade-entered {
    opacity: 1;
    transition: opacity 250ms ease-in;
  }
  .fade-exiting {
    opacity: 0;
    transition: opacity 250ms ease-out;
  }
  .fade-exited {
    opacity: 0;
    z-index: 0;
  }
`;

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: ["hello", "world", "click", "me"] };
  }
  handleAdd() {
    const newItems = this.state.items.concat([prompt("Enter some text")]);
    this.setState({ items: newItems });
  }
  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({ items: newItems });
  }
  render() {
    return (
      <div>
        <Button onClick={() => this.handleAdd()}>Add Item</Button>
        <TransitionGroup>
          {this.state.items.map((item, i) =>
            <Transition key={item} timeout={300}>
              {status =>
                <div className={`fade fade-${status}`}>
                  {item}{" "}
                  <Button onClick={() => this.handleRemove(i)}>remove</Button>
                </div>}
            </Transition>
          )}
        </TransitionGroup>
        <Waypoint
          onEnter={() => {
            console.log("waypoint entered yo");
          }}
        />
      </div>
    );
  }
}

export default props => {
  return (
    <Border p={5} m={3}>
      <Box>
        <TodoList />
      </Box>
    </Border>
  );
};
