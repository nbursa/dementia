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
    console.log("Submitting form with title:", newTodoTitle);
    if (newTodoTitle.trim() !== '') {
      onSubmit(newTodoTitle);
      setNewTodoTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row w-full md:max-w-xl absolute bottom-0 px-6 md:px-0 mx-6 transform translate-y-full">
      <TodoInput className="flex flex-grow border p-2 text-gray-300 bg-base-dark border-solid border-gray-700 rounded-lg text-base outline-none focus:outline-none font-normal focus:border-transparent transform -translate-y-1/2" value={newTodoTitle} onChange={handleInputChange} />
      <TodoButton className="flex flex-row items-center justify-center md:ml-2 bg-blue-500 text-sm font-bold hover:bg-blue-600 text-white rounded-lg px-4 py-2 transform -translate-y-1/2" type="submit" label="Add" />
    </form>
  );
};

export default TodoForm;