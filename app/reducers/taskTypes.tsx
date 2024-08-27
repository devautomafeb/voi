import { Goal } from "./goalTypes";

export const ADD_TASK = 'ADD_TASK ';
export const DEL_TASK = 'DEL_TASK';
export const CHECK_TASK = 'CHECK_TASK';
export const INIT_TASKS = 'INIT_TASKS';  // Adicione esta linha

export type taskData = {
    description: string,
    completed?:boolean,
    date: Date
}

export type Task = {
    id: number;
    task: taskData;
    relatedGoal?: Goal
}

export type TaskContextType = {
    tasks: Task[];
    addTask: (todo: Task) => void;
    delTask: (todo: Task) => void,
    checkTask: (todo: Task) => void,
}