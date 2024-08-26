import { ADD_GOAL, CHECK_GOAL, DEL_GOAL, Goal } from "./types";

export const goalReducer = (state: Goal[], action: { type: string; payload: Goal }): Goal[] => {
  switch (action.type) {
    case ADD_GOAL:
      return [...state, action.payload];
    case DEL_GOAL:
      return state.filter(item => item.id !== action.payload.id);
    case CHECK_GOAL:
      return state.map(item => item.id === action.payload.id ? { ...item, completed: true } : item);
    default:
      return state;
  }
};

