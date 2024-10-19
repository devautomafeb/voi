import { ADD_TASK, CHECK_TASK, DEL_TASK, INIT_TASKS, Task } from './taskTypes';

type Action = 
  | { type: typeof ADD_TASK; payload: Task }
  | { type: typeof DEL_TASK; payload: { id: number } }
  | { type: typeof CHECK_TASK; payload: { id: number } }
  | { type: typeof INIT_TASKS; payload: Task[] };

export const taskReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case ADD_TASK:
      return [
        ...state,
        action.payload,
      ].sort((a, b) => Number(a.task.completed) - Number(b.task.completed));

    case DEL_TASK:
      return state.filter(item => item.id !== action.payload.id);

    case CHECK_TASK:
      return state
        .map(item =>
          item.id === action.payload.id
            ? { ...item, task: { ...item.task, completed: true } }
            : item
        )
        .sort((a, b) => Number(a.task.completed) - Number(b.task.completed));

    case INIT_TASKS:
      return action.payload.sort((a, b) => Number(a.task.completed) - Number(b.task.completed));

    default:
      return state;
  }
};
