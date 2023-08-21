import React from 'react';
import TodoItem from '../atoms/TodoItem.tsx';
import { Todo } from '../../types/todoType.ts';
import TodoNoResults from "../atoms/TodoNoResults.tsx";
import TodoResultsHeader
  from "../atoms/TodoResultsHeader.tsx";

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const totalDoneTodos = todos.filter(todo => todo.completed).length;

  return (
    <>
      <TodoResultsHeader total={todos.length} done={totalDoneTodos} />
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
      {todos.length === 0 && (
        <TodoNoResults />
      )}
    </>
  );
};

export default TodoList;