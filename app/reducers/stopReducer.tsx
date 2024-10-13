import { ADD_STOP, DEL_STOP, Stop, INIT_STOPS } from "./stopTypes";

type Action = 
  | { type: typeof ADD_STOP; payload: Stop }
  | { type: typeof DEL_STOP; payload: { id: number } }
  | { type: typeof INIT_STOPS; payload: Stop[] };  // Adicione esta linha

export const stopReducer = (state: Stop[], action: Action): Stop[] => {
  switch (action.type) {
    case ADD_STOP:
      return [...state, action.payload];
    case DEL_STOP:
      return state.filter(item => item.id !== action.payload.id);
    case INIT_STOPS:  // Adicione este caso
      return action.payload;
    default:
      return state;
  }
};
