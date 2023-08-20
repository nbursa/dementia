import React from 'react';

interface TodoInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const TodoInput: React.FC<TodoInputProps> = ({ value, onChange }) => {
  return (
    <input
      className="flex-grow border rounded p-2 mr-2"
      type="text"
      placeholder="Enter a new todo..."
      value={value}
      onChange={onChange}
    />
  );
};

export default TodoInput;