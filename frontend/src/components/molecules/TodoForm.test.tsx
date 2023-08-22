import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TodoForm from './TodoForm';

test('renders the TodoForm component', () => {
  render(<TodoForm onSubmit={() => {}} />);
  const todoFormElement = screen.getByTestId('todo-form');
  expect(todoFormElement).toBeInTheDocument();
});

test('submits new todo on form submission', () => {
  const onSubmitMock = jest.fn();
  render(<TodoForm onSubmit={onSubmitMock} />);
  const inputElement = screen.getByTestId('todo-input');
  const addButton = screen.getByRole('button', { name: /add/i });

  fireEvent.change(inputElement, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  expect(onSubmitMock).toHaveBeenCalledWith('New Task');
});