import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  todos: Todo[];
  // fetchTodos: typeof fetchTodos; // it does not return a normal action object but a function instead
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

interface AppState {
  fetching: boolean;
}

class _App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { fetching: false };
  }

  componentDidUpdate(prevProps: AppProps): void {
    // small bugs here, if wo click on fetch button again, prevProps.todos.length is not 0
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }

  onButtonClick = (): void => {
    this.props.fetchTodos();
    this.setState({ fetching: true });
  };

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id);
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div key={todo.id} onClick={() => this.onTodoClick(todo.id)}>
          {todo.title}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {console.log(this.state.fetching)}
        <button onClick={this.onButtonClick}>Fetch</button>
        {this.state.fetching && 'LOADING'}
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return {
    todos,
  };
};

// export connected version of _APP, i.e. APP
export const App = connect(mapStateToProps, {
  fetchTodos,
  deleteTodo,
})(_App);
