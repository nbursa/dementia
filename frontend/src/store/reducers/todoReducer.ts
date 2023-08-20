import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface InitialState {
  todos: Todo[];
}

const initialState: InitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(), // This is just a basic way to get unique IDs. In a real-world application, you'd likely use something more robust.
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const index = state.todos.findIndex((t) => t.id === action.payload);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;