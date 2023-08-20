import React, { useState } from 'react';
import TodoList from './components/TodoList';
import { useQuery, useMutation } from '@apollo/client';
import {FETCH_TODOS} from "./graphql/queries";
import {
  CREATE_TODO
} from "./graphql/mutations/createTodo.ts";
import TodoForm from "./components/TodoForm.tsx";


const App: React.FC = () => {
  const { loading, error, data } = useQuery(FETCH_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleCreateTodo = async () => {
    if (newTodoTitle.trim() !== '') {
      await createTodo({
        variables: { title: newTodoTitle },
        refetchQueries: [{ query: FETCH_TODOS }],
      });
      setNewTodoTitle('');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto font-inter p-4">
      <h2 className="text-3xl font-bold mb-4 text-base">Todo App</h2>
      <TodoForm onSubmit={handleCreateTodo} />
      <TodoList todos={data.getToDos} />
    </div>
  );
};

export default App;