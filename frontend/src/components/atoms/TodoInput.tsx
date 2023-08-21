import React from 'react';

interface TodoInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  className: string
}

const TodoInput: React.FC<TodoInputProps> = ({
                                               value,
                                               onChange,
                                               className
                                             }) => {
  return (
    <input
      type="text"
      placeholder="Enter a new todo..."
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default TodoInput;