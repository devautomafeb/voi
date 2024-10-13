import { ADD_GOAL, DEL_GOAL, CHECK_GOAL, INIT_GOALS, Goal, Action } from './goalTypes';

export function goalReducer(state: Goal[], action: Action): Goal[] {
  switch (action.type) {
    case ADD_GOAL:
      return [...state, action.payload];

    case DEL_GOAL:
      return state.filter(goal => goal.id !== action.payload.id);

    case CHECK_GOAL:
      return state.map(goal =>
        goal.id === action.payload.id ? { ...goal, completed: !goal.completed } : goal
      );

      case INIT_GOALS:
        return action.payload.map(goal => ({
          ...goal,
          endDate: goal.endDate ? new Date(goal.endDate) : new Date(),  // Garante que endDate seja um Date válido
        }));

    default:
      return state;
  }
}
