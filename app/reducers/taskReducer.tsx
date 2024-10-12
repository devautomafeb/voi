import { ADD_TASK, CHECK_TASK, DEL_TASK, Task, INIT_TASKS } from "./taskTypes";

type Action = 
  | { type: typeof ADD_TASK; payload: Task }
  | { type: typeof DEL_TASK; payload: { id: number } }
  | { type: typeof CHECK_TASK; payload: { id: number } }
  | { type: typeof INIT_TASKS; payload: Task[] };  // Adicione esta linha

  export const taskReducer = (state: Task[], action: Action): Task[] => {
    switch (action.type) {
      case ADD_TASK:
        return [
          ...state, // Adiciona a nova task ao final da lista
          action.payload
        ].sort((a, b) => Number(a.task.completed) - Number(b.task.completed)); // Reorganiza: concluidas no fim
      case DEL_TASK:
        return state.filter(item => item.id !== action.payload.id);
      case CHECK_TASK:
        return state
          .map(item =>
            item.id === action.payload.id
              ? { ...item, task: { ...item.task, completed: true } }
              : item
          )
          .sort((a, b) => Number(a.task.completed) - Number(b.task.completed)); // Reorganiza tasks concluídas para o fim
      case INIT_TASKS:
        return action.payload.sort((a, b) => Number(a.task.completed) - Number(b.task.completed)); // Inicializa com as tasks organizadas
      default:
        return state;
    }
  };
  