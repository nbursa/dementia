import React from 'react';

interface TodoInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
  className: string
}

const TodoInput = React.forwardRef<HTMLInputElement, TodoInputProps>(
  ({ value, onChange, onBlur, className }, ref) => {
    return (
      <input
        type="text"
        placeholder="Enter a new todo..."
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={className}
        ref={ref}
      />
    );
  }
);

export default TodoInput;