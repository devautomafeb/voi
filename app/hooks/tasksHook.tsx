import React, { ReactNode, createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_TASK, CHECK_TASK, DEL_TASK, INIT_TASKS, Task, TaskContextType } from '../reducers/taskTypes';
import { taskReducer } from '../reducers/taskReducer';

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: (todo: Task) => {},
  delTask: (todo: Task) => {},
  checkTask: (todo: Task) => {},
});

interface TaskContextProviderProps {
  children: ReactNode;
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  // Carregar tarefas salvas do AsyncStorage ao inicializar
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) {
          dispatch({ type: INIT_TASKS, payload: JSON.parse(savedTasks) });
        }
      } catch (error) {
        console.error('Failed to load tasks from storage', error);
      }
    };

    loadTasks();
  }, []);

  // Função para salvar tarefas no AsyncStorage
  const saveTasksToStorage = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Failed to save tasks to storage', error);
    }
  };

  function addTask(todo: Task) {
    const updatedTasks = [...tasks, todo];
    dispatch({ type: ADD_TASK, payload: todo });
    saveTasksToStorage(updatedTasks); // Salvar as tarefas atualizadas
  }

  function delTask(todo: Task) {
    const updatedTasks = tasks.filter(t => t.id !== todo.id);
    dispatch({ type: DEL_TASK, payload: todo });
    saveTasksToStorage(updatedTasks); // Salvar as tarefas atualizadas
  }

  function checkTask(todo: Task) {
    const updatedTasks = tasks.map(t =>
      t.id === todo.id ? { ...t, task: { ...t.task, completed: true } } : t
    );
    dispatch({ type: CHECK_TASK, payload: todo });
    saveTasksToStorage(updatedTasks); // Salvar as tarefas atualizadas
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        delTask,
        checkTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
