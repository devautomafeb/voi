import React, { ReactNode, createContext, useReducer } from 'react';
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

    function addTask(todo: Task) {
        dispatch({ type: ADD_TASK, payload: todo });
    };

    function delTask(todo: Task) {
        dispatch({ type: DEL_TASK, payload: todo });
    };

    function checkTask(todo: Task) {
        dispatch({ type: CHECK_TASK, payload: todo });
    };

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
};