import React, { ReactNode, createContext, useReducer } from 'react';
import { ADD_GOAL, CHECK_GOAL, DEL_GOAL, Goal, GoalContextType } from '../reducers/types';
import { goalReducer } from '../reducers';


export const GoalContext = createContext<GoalContextType>({
  goals: [],
  addGoals: (todo: Goal) => {},
  delGoals: (todo: Goal) => {},
  checkGoals: (todo: Goal) => {}
});

interface GoalContextProviderProps {
  children: ReactNode
}

export function GoalContextProvider({ children }: GoalContextProviderProps) {

  const [goals, dispatch] = useReducer(goalReducer, []);

  function addGoals(todo: Goal) {
    dispatch({ type: ADD_GOAL, payload: todo });
  };

  function delGoals(todo: Goal) {
    dispatch({ type: DEL_GOAL, payload: todo });
  };

  function checkGoals(todo: Goal) {
    dispatch({ type: CHECK_GOAL, payload: todo });
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        addGoals,
        delGoals,
        checkGoals
      }}>
      {children}
    </GoalContext.Provider>
  );
};