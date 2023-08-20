import React, { useState } from 'react';
import TodoList from './components/TodoList';
import { useQuery, useMutation } from '@apollo/client';
import {FETCH_TODOS} from "./graphql/queries";
import {
  CREATE_TODO
} from "./graphql/mutations/createTodo.ts";


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
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a new todo..."
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <button onClick={handleCreateTodo}>Create Todo</button>
      </div>
      <TodoList todos={data.getToDos} />
    </div>
  );
};

export default App;