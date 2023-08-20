import React from 'react';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  // Fetch todos from GraphQL and provide them to TodoList

  return (
    <div>
      <h1>Todo App</h1>
      <TodoList todos={/* Provide fetched todos here */[]} />
    </div>
  );
};

export default App;