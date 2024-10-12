import Realm from 'realm';
import { ADD_GOAL, CHECK_GOAL, DEL_GOAL, Goal, INIT_GOALS } from "./goalTypes";
import GoalSchema, ProjectDataSchema  from '../model/Project';

type Action = 
  | { type: typeof ADD_GOAL; payload: Goal }
  | { type: typeof DEL_GOAL; payload: { id: number } }
  | { type: typeof CHECK_GOAL; payload: { id: number } }
  | { type: typeof INIT_GOALS; payload: Goal[] };

export const goalReducer = (state: Goal[], action: Action): Goal[] => {
  switch (action.type) {
    case ADD_GOAL:
      // Escrever no Realm ao adicionar uma meta
      const realm = new Realm({ schema: [GoalSchema, ProjectDataSchema] });
      realm.write(() => {
        realm.create('Goal', action.payload);
      });
      realm.close();
      return [...state, action.payload];
    
    case DEL_GOAL:
      // Remover do Realm ao deletar
      const realmDelete = new Realm({ schema: [GoalSchema, ProjectDataSchema] });
      realmDelete.write(() => {
        const goalToDelete = realmDelete.objectForPrimaryKey('Goal', action.payload.id);
        if (goalToDelete) {
          realmDelete.delete(goalToDelete);
        }
      });
      realmDelete.close();
      return state.filter(item => item.id !== action.payload.id);
    
    case CHECK_GOAL:
      // Marcar como completo no Realm
      const realmCheck = new Realm({ schema: [GoalSchema, ProjectDataSchema] });
      realmCheck.write(() => {
        const goalToUpdate = realmCheck.objectForPrimaryKey('Goal', action.payload.id);
        if (goalToUpdate) {
          goalToUpdate.completed = true;
        }
      });
      realmCheck.close();
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, completed: true }
          : item
      );
    
    case INIT_GOALS:
      return action.payload;

    default:
      return state;
  }
};
