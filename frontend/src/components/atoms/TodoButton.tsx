import React from 'react';

interface TodoButtonProps {
  type: "submit" | "button" | "reset";
  label: string;
  className: string;
}

const TodoButton: React.FC<TodoButtonProps> = ({ type, label, className }) => {
  return (
    <button
      className={className}
      type={type}
    >
      {label}
      <span className="ml-2"><img src="../../../public/plus.svg" alt="Plus svg" /></span>
    </button>
  );
};

export default TodoButton;