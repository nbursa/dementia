import React from 'react';

interface TodoButtonProps {
  type: "submit" | "button" | "reset";
  label: string;
}

const TodoButton: React.FC<TodoButtonProps> = ({ type, label }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
      type={type}
    >
      {label}
    </button>
  );
};

export default TodoButton;