import React, { ReactNode, createContext, useReducer, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_TASK, CHECK_TASK, DEL_TASK, Task, TaskContextType } from '../reducers/taskTypes';
import { taskReducer } from '../reducers/taskReducer';

export const TaskContext = createContext<TaskContextType>({
    tasks: [],
    addTask: (todo: Task) => { },
    delTask: (todo: Task) => { },
    checkTask: (todo: Task) => { }
});

interface TaskContextProviderProps {
    children: ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [tasks, dispatch] = useReducer(taskReducer, []);
    const [loading, setLoading] = useState(true);

    // Load tasks from AsyncStorage on component mount
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const storedTasks = await AsyncStorage.getItem('tasks');
                if (storedTasks) {
                    dispatch({ type: 'INIT_TASKS', payload: JSON.parse(storedTasks) });
                }
            } catch (error) {
                console.error('Failed to load tasks from storage:', error);
            } finally {
                setLoading(false);
            }
        };
        loadTasks();
    }, []);

    // Save tasks to AsyncStorage whenever the tasks state changes
    useEffect(() => {
        const saveTasks = async () => {
            try {
                await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            } catch (error) {
                console.error('Failed to save tasks to storage:', error);
            }
        };
        if (!loading) {
            saveTasks();
        }
    }, [tasks, loading]);

    function addTask(todo: Task) {
        dispatch({ type: ADD_TASK, payload: todo });
    }

    function delTask(todo: Task) {
        dispatch({ type: DEL_TASK, payload: todo });
    }

    function checkTask(todo: Task) {
        dispatch({ type: CHECK_TASK, payload: todo });
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                delTask,
                checkTask
            }}>
            {children}
        </TaskContext.Provider>
    );
}
