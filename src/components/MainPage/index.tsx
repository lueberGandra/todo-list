//import { ReactNode } from 'react';
import './style.scss'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ThunkDispatch } from 'redux-thunk'

import { AppState } from '../../store';
import { AppActions } from '../../store/models/actions';

import { Todo } from '../../store/todo/models/Todo';
import { boundRequestTodos } from '../../store/todo/TodoAction';
import { useEffect } from 'react';

interface Props { }

interface LinkStateProps {
  todos: Todo[]
}
interface LinkDispatchProps {
  boundRequestTodos: () => void
}

type LinkProps = Props & LinkStateProps & LinkDispatchProps

const mapStateToProps = (state: AppState): LinkStateProps => ({
  todos: state.todoReducer.todos
})

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, {}, AppActions>) => ({
  boundRequestTodos: bindActionCreators(boundRequestTodos, dispatch)
})




const MainPage: React.FC<LinkProps> = ({ todos, boundRequestTodos }) => {

  useEffect(() => {
    boundRequestTodos()
  }, [])

  return (
    <div id='MainPage'>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo: Todo) => (
          <>
            {console.warn(todo.completed)}
            <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</li>
          </>
        ))}
      </ul>
    </div>

  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
