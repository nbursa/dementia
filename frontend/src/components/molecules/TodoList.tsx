import React from 'react';
import TodoItem from '../atoms/TodoItem.tsx';
import { ToDo } from '../../types/todoType.ts';
import TodoNoResults from "../atoms/TodoNoResults.tsx";
import TodoResultsHeader
  from "../atoms/TodoResultsHeader.tsx";

interface TodoListProps {
  todos: ToDo[];
  className?: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, className }) => {
  const totalDoneTodos = todos.filter(todo => todo.completed).length;
  const reversedTodos = [...todos].reverse();

  return (
    <div className={className}>
      <TodoResultsHeader total={todos.length} done={totalDoneTodos} />
      {reversedTodos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
      {todos.length === 0 && (
        <TodoNoResults />
      )}
    </div>
  );
};

export default TodoList;