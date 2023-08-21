import React, { useState } from 'react';
import TodoList from './components/molecules/TodoList.tsx';
import { useQuery, useMutation } from '@apollo/client';
import { FETCH_TODOS } from "./graphql/queries";
import { CREATE_TODO } from "./graphql/mutations/createTodo.ts";
import TodoForm from "./components/molecules/TodoForm.tsx";

const App: React.FC = () => {
  const { loading, error, data } = useQuery(FETCH_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  // const handleCreateTodo = async () => {
  //   if (newTodoTitle.trim() !== '') {
  //     await createTodo({
  //       variables: { title: newTodoTitle },
  //       refetchQueries: [{ query: FETCH_TODOS }],
  //     });
  //     setNewTodoTitle('');
  //   }
  // };
  const handleCreateTodo = async () => {
    console.log("handleCreateTodo triggered");
    if (newTodoTitle.trim() !== '') {
      try {
        await createTodo({
          variables: { title: newTodoTitle },
          refetchQueries: [{ query: FETCH_TODOS }],
        });
        setNewTodoTitle('');
      } catch (err) {
        console.error("Error creating todo:", err);
      }
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-base-darker flex flex-col h-screen font-inter">
      <div className="relative bg-base-darkest h-[20vh] flex flex-col items-center justify-center px-6">
        <h2 className="bg-gradient-linear bg-clip-text text-transparent text-4xl font-bold text-center">Dementia</h2>
        <small className="text-gray-400 text-center text-xs italic">A simple todo app built with React, Tailwind, Redux, GraphQL and MongoDB</small>
        <TodoForm onSubmit={handleCreateTodo} />
      </div>
      <div className="w-full md:max-w-2xl mx-auto p-6 flex flex-col overflow-hidden overflow-y-auto">
        <TodoList todos={data.getTodos} />
      </div>
    </div>
  );
};

export default App;