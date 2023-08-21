import React from 'react';
import TodoList from './components/molecules/TodoList.tsx';
import { useQuery, useMutation } from '@apollo/client';
import { FETCH_TODOS } from "./graphql/queries";
import { CREATE_TODO } from "./graphql/mutations/createTodo.ts";
import TodoForm from "./components/molecules/TodoForm.tsx";

interface TodosData {
  getTodos: Array<{
    _id: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
}

const App: React.FC = () => {
  const { loading, error, data } = useQuery(FETCH_TODOS);
  const [createTodo, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_TODO);

  const handleCreateTodo = async (title: string) => {
    console.log("handleCreateTodo triggered with title:", title);
    if (title.trim() !== '') {
      try {
        await createTodo({
          variables: {
            title: title,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          optimisticResponse: {
            __typename: "Mutation",
            createTodo: {
              __typename: "Todo",
              _id: "temp-id", // Server will replace this
              title: title,
              completed: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          },
          update: (cache, { data }) => {
            const newTodo = data?.createTodo;
            if (newTodo) {
              const existingTodos = cache.readQuery<TodosData>({ query: FETCH_TODOS });
              if (existingTodos) {
                cache.writeQuery({
                  query: FETCH_TODOS,
                  data: {
                    getTodos: [...existingTodos.getTodos, newTodo]
                  }
                });
              }
            }
          },
        });
      } catch (err) {
        console.error("Error creating todo:", err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (mutationLoading) return <p>Creating todo...</p>;
  if (mutationError) return <p>Error creating todo: {mutationError.message}</p>;

  return (
    <div className="bg-base-darker flex flex-col h-screen font-inter">
      <div className="relative bg-base-darkest h-[20vh] flex flex-col items-center justify-center px-6">
        <h1 className="bg-gradient-linear bg-clip-text text-transparent text-3xl sm:text-4xl xl:text-5xl font-bold text-center -mt-6">Dementia</h1>
        <p className="text-gray-400 text-center text-xs italic">A simple todo app built with React, Tailwind, Redux, GraphQL and MongoDB</p>
        <TodoForm onSubmit={handleCreateTodo} />
      </div>
      <div className="w-full mx-auto p-6 flex flex-col overflow-hidden overflow-y-auto">
        <TodoList className="w-full md:max-w-2xl md:mx-auto" todos={data.getTodos} />
      </div>
    </div>
  );
};

export default App;