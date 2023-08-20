import React from 'react';
import TodoItem from './TodoItem';

interface Props {
  todos: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
}

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;