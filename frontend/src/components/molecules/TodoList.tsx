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
  return (
    <>
      <TodoResultsHeader />
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