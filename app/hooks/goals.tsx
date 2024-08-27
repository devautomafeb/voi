import React, { ReactNode, createContext, useReducer, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_GOAL, CHECK_GOAL, DEL_GOAL, Goal, GoalContextType } from '../reducers/goalTypes';
import { goalReducer } from '../reducers/goalReducer';

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
  const [loading, setLoading] = useState(true);

  // Load goals from AsyncStorage on component mount
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem('goals');
        if (storedGoals) {
          dispatch({ type: 'INIT_GOALS', payload: JSON.parse(storedGoals) });
        }
      } catch (error) {
        console.error('Failed to load goals from storage:', error);
      } finally {
        setLoading(false);
      }
    };
    loadGoals();
  }, []);

  // Save goals to AsyncStorage whenever the goals state changes
  useEffect(() => {
    const saveGoals = async () => {
      try {
        await AsyncStorage.setItem('goals', JSON.stringify(goals));
      } catch (error) {
        console.error('Failed to save goals to storage:', error);
      }
    };
    if (!loading) {
      saveGoals();
    }
  }, [goals, loading]);

  function addGoals(todo: Goal) {
    dispatch({ type: ADD_GOAL, payload: todo });
  }

  function delGoals(todo: Goal) {
    dispatch({ type: DEL_GOAL, payload: todo });
  }

  function checkGoals(todo: Goal) {
    dispatch({ type: CHECK_GOAL, payload: todo });
  }

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
}
