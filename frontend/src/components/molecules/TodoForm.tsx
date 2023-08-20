import React, { useState } from 'react';
import TodoButton from "../atoms/TodoButton.tsx";
import TodoInput from "../atoms/TodoInput.tsx";

interface TodoInputProps {
  onSubmit: (title: string) => void;
}

const TodoForm: React.FC<TodoInputProps> = ({ onSubmit }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim() !== '') {
      onSubmit(newTodoTitle);
      setNewTodoTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mb-4">
      <TodoInput value={newTodoTitle} onChange={handleInputChange} />
      <TodoButton type="submit" label="Create Todo" />
    </form>
  );
};

export default TodoForm;