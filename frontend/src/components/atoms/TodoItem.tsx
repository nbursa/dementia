import React from 'react';
import { Todo } from '../../types/todoType.ts';
import {
  Reference,
  useMutation
} from "@apollo/client";
import {
  UPDATE_TODO
} from "../../graphql/mutations/updateTodo.ts";
import {
  REMOVE_TODO
} from "../../graphql/mutations/removeTodo.ts";
import {FETCH_TODOS} from "../../graphql/queries";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);

  const handleToggle = (id: string, completed: boolean) => {
    updateTodo({
      variables: {
        _id: id,
        completed: !completed,
      },
      update: (cache, { data }) => {
        // Update the cache after the mutation
        const updatedTodo = data?.updatedTodo;
        if (updatedTodo) {
          cache.modify({
            id: cache.identify({
              __typename: 'Todo',
              _id: id,
            }),
            fields: {
              completed: () => updatedTodo.completed,
            },
          });
        }
      },
    });
  };

  const handleDelete = (id: string) => {
    console.log('handleDelete', id)
    removeTodo({
      variables: {
        _id: id,
      },
      refetchQueries: [{ query: FETCH_TODOS }],
      update: (cache) => {
        // Update the cache after the deletion
        cache.modify({
          fields: {
            todos: (existingTodos, { readField }) => {
              // Remove the deleted todo from the cache
              return existingTodos.filter(
                (todoRef: Reference) => id !== readField("_id", todoRef)
              );
            },
          },
        });
      },
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} w-full flex justify-between items-center mb-2 p-2 border border-base`}>
      <label htmlFor={`checkbox-${todo._id}`} className="h-6 w-6 bg-base-gray-200 cursor-pointer rounded-full flex items-center justify-center">
        {todo.completed ? (
          <img className="w-full h-full" src="../../../public/check.svg" alt="Check icon"/>
        ) : (
          ''
        )}
        <input
          type="checkbox"
          id={`checkbox-${todo._id}`}
          checked={todo.completed}
          onChange={() => handleToggle(todo._id, todo.completed)}
          className="ml-2 sr-only"
        />
      </label>
      <div>{todo.title}</div>
      <button className="bg-yellow-50 p-4 rounded-full" onClick={() => handleDelete(todo._id)}>
        <img src="../../../public/trash-can.svg" alt="Trash can icon"/>
      </button>
    </div>
  );
};

export default TodoItem;