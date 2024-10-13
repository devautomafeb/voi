import { ADD_IDEA, DEL_IDEA, Idea, INIT_IDEAS } from "./ideaTypes";

type Action = 
  | { type: typeof ADD_IDEA; payload: Idea }
  | { type: typeof DEL_IDEA; payload: { id: number } }
  | { type: typeof INIT_IDEAS; payload: Idea[] };  // Adicione esta linha

export const ideaReducer = (state: Idea[], action: Action): Idea[] => {
  switch (action.type) {
    case ADD_IDEA:
      return [...state, action.payload];
    case DEL_IDEA:
      return state.filter(item => item.id !== action.payload.id);
    case INIT_IDEAS:  // Adicione este caso
      return action.payload;
    default:
      return state;
  }
};
