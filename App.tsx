import React, { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';

interface Todo {
  id: number;
  title: string;
  // Add other todo properties as needed
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create an async function inside useEffect
    async function getTodos() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('todos').select('*');
        
        if (error) {
          console.error('Error fetching todos:', error);
          setError(error.message);
          return;
        }
        
        setTodos(data || []);
        setError(null);
      } catch (error) {
        console.error('Exception fetching todos:', error);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    getTodos();
  }, []);

  return (
    <div>
      <h1>My Todos</h1>
      {loading ? (
        <p>Loading todos...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : todos.length === 0 ? (
        <p>No todos found</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
