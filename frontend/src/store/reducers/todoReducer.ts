import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from "../../types/todoType.ts";

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
    createTodo: (state, action: PayloadAction<string>) => {
      console.log('action', action)
      const newTodo: Todo = {
        _id: Date.now().toString(),
        title: action.payload,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      state.todos.push(newTodo);
      console.log('newTodo', state.todos)
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t._id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex((t) => t._id === action.payload);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
  },
});

export const { createTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;