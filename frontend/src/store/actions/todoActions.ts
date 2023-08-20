// Action Types
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

// TypeScript Type Definitions for Action Payloads and Actions
interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: {
    id: string;
    title: string;
  };
}

interface RemoveTodoAction {
  type: typeof REMOVE_TODO;
  payload: {
    id: string;
  };
}

interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  payload: {
    id: string;
  };
}

export type TodoActionTypes = AddTodoAction | RemoveTodoAction | ToggleTodoAction;

// Action Creators
export const addTodo = (id: string, title: string): AddTodoAction => {
  return {
    type: ADD_TODO,
    payload: {
      id,
      title
    }
  };
};

export const removeTodo = (id: string): RemoveTodoAction => {
  return {
    type: REMOVE_TODO,
    payload: {
      id
    }
  };
};

export const toggleTodo = (id: string): ToggleTodoAction => {
  return {
    type: TOGGLE_TODO,
    payload: {
      id
    }
  };
};