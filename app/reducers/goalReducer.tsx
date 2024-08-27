import { ADD_GOAL, CHECK_GOAL, DEL_GOAL, Goal, INIT_GOALS } from "./goalTypes";

type Action = 
  | { type: typeof ADD_GOAL; payload: Goal }
  | { type: typeof DEL_GOAL; payload: { id: number } }
  | { type: typeof CHECK_GOAL; payload: { id: number } }
  | { type: typeof INIT_GOALS; payload: Goal[] };  // Adicione esta linha

export const goalReducer = (state: Goal[], action: Action): Goal[] => {
  switch (action.type) {
    case ADD_GOAL:
      return [...state, action.payload];
    case DEL_GOAL:
      return state.filter(item => item.id !== action.payload.id);
    case CHECK_GOAL:
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, completed: true }
          : item
      );
    case INIT_GOALS:  // Adicione este caso
      return action.payload;
    default:
      return state;
  }
};
