import React, {useEffect, useRef, useState} from 'react';
import { ToDo } from '../../types/todoType.ts';
import {gql, Reference, useMutation} from "@apollo/client";
import { UPDATE_TODO } from "../../graphql/mutations/updateTodo.ts";
import { REMOVE_TODO } from "../../graphql/mutations/removeTodo.ts";
import {FETCH_TODOS} from "../../graphql/queries";
import TodoInput from "./TodoInput.tsx";

interface TodoItemProps {
  todo: ToDo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const inputElement = inputRef.current as HTMLInputElement;
      inputElement.focus();
      const length = inputElement.value.length;
      inputElement.setSelectionRange(length, length);
    }
  }, [isEditing]);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  // const handleTitleSubmit = async () => {
  //   console.log("Changing title to:", editedTitle);
  //   if (editedTitle.trim() !== '') {
  //     await updateTodo({
  //       variables: {
  //         _id: todo._id,
  //         title: editedTitle,
  //         completed: todo.completed,
  //         updatedAt: new Date(),
  //         createdAt: todo.createdAt,
  //       },
  //       refetchQueries: [{ query: FETCH_TODOS }],
  //     });
  //     setIsEditing(false);
  //     console.log("Title changed!", editedTitle);
  //   }
  // };
    const handleTitleSubmit = async () => {
      console.log("Changing title to:", editedTitle);
        if (editedTitle.trim() !== '') {
            try {
                await updateTodo({
                  variables: {
                    _id: todo._id,
                    title: editedTitle,
                    completed: todo.completed,
                    updatedAt: new Date(),
                    createdAt: todo.createdAt,
                  },
                  optimisticResponse: {
                    __typename: "Mutation",
                    updateTodo: {
                      __typename: "Todo",
                      _id: todo._id,
                      title: editedTitle,
                      completed: todo.completed,
                      updatedAt: new Date(),
                      createdAt: todo.createdAt,
                    },
                  },
                    update: (cache, { data }) => {
                      const updatedTodo = data?.updateTodo;
                        if (updatedTodo) {
                            cache.writeFragment({
                              id: cache.identify({
                                __typename: 'ToDo',
                                _id: todo._id,
                              }),
                                fragment: gql`
                                    fragment UpdatedTodo on ToDo {
                                        title
                                        updatedAt
                                    }
                                `,
                              data: {
                                title: updatedTodo.title,
                                updatedAt: updatedTodo.updatedAt,
                              },
                            });
                        }
                    },
                });
              setIsEditing(false);
              console.log("Title changed!", editedTitle);
            } catch (error) {
              console.error("Failed to update todo:", error);
              // Show a user-friendly error message here.
            }
        }
    };

  const handleToggle = (id: string, completed: boolean) => {
    updateTodo({
      variables: {
        _id: id,
        title: todo.title,
        createdAt: todo.createdAt,
        updatedAt: new Date(),
        completed: !completed,
      },
      update: (cache, { data }) => {
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
    removeTodo({
      variables: {
        _id: id,
      },
      refetchQueries: [{ query: FETCH_TODOS }],
      update: (cache) => {
        cache.modify({
          fields: {
            todos: (existingTodos, { readField }) => {
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
    <div className={`todo-item ${todo.completed ? 'completed' : ''} w-full flex justify-between items-center mb-2 p-2 border border-solid border-base-gray-700 rounded`}>
      <label htmlFor={`checkbox-${todo._id}`} className="h-6 w-6 bg-base-gray-200 cursor-pointer rounded-full flex items-center justify-center ring-2 hover:ring-4 ring-inset ring-core-purple-dark ease-in-out">
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

      {isEditing ? (
        <TodoInput onChange={handleTitleChange} onBlur={handleTitleSubmit} value={editedTitle} className="bg-base-dark text-base text-gray-200 py-1 px-4 rounded border border-solid border-gray-700" />
      ) : (
        <div className="max-w-[65%]" onClick={handleTitleClick}>
          {todo.title}
        </div>
      )}

      <button className="p-2 rounded-full bg-base-dark hover:bg-base-darkest ease-in-out" onClick={() => handleDelete(todo._id)}>
        <img src="../../../public/trash-can.svg" alt="Trash can icon"/>
      </button>
    </div>
  );
};

export default TodoItem;