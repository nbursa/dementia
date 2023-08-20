import React from 'react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span className="todo-title">{todo.title}</span>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => {} /* You can add a handler to toggle the todo here */}
      />
    </div>
  );
};

export default TodoItem;