import React, { ReactNode, createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_GOAL, DEL_GOAL, CHECK_GOAL, INIT_GOALS, Goal, GoalContextType } from '../reducers/goalTypes';
import { goalReducer } from '../reducers/goalReducer';

export const GoalContext = createContext<GoalContextType>({
  goals: [],
  addGoals: (goal: Goal) => {},
  delGoals: (goal: Goal) => {},
  checkGoals: (goal: Goal) => {}
});

interface GoalContextProviderProps {
  children: ReactNode;
}

export function GoalContextProvider({ children }: GoalContextProviderProps) {

  const [goals, dispatch] = useReducer(goalReducer, []);

  // Carregar metas salvas do AsyncStorage ao inicializar
  useEffect(() => {
    const loadGoals = async () => {
      try {
        const savedGoals = await AsyncStorage.getItem('goals');
        if (savedGoals) {
          dispatch({ type: INIT_GOALS, payload: JSON.parse(savedGoals) });
        }
      } catch (error) {
        console.error('Failed to load goals from storage', error);
      }
    };

    loadGoals();
  }, []);

  // Função para salvar metas no AsyncStorage
  const saveGoalsToStorage = async (newGoals: Goal[]) => {
    try {
      await AsyncStorage.setItem('goals', JSON.stringify(newGoals));
    } catch (error) {
      console.error('Failed to save goals to storage', error);
    }
  };

  function addGoals(goal: Goal) {
    const updatedGoals = [...goals, goal];
    dispatch({ type: ADD_GOAL, payload: goal });
    saveGoalsToStorage(updatedGoals); // Salvar as metas atualizadas
  }

  function delGoals(goal: Goal) {
    const updatedGoals = goals.filter(g => g.id !== goal.id);
    dispatch({ type: DEL_GOAL, payload: goal });
    saveGoalsToStorage(updatedGoals); // Salvar as metas atualizadas
  }

  function checkGoals(goal: Goal) {
    const updatedGoals = goals.map(g =>
      g.id === goal.id ? { ...g, completed: !g.completed } : g
    );
    dispatch({ type: CHECK_GOAL, payload: goal });
    saveGoalsToStorage(updatedGoals); // Salvar as metas atualizadas
  }

  return (
    <GoalContext.Provider
      value={{
        goals,
        addGoals,
        delGoals,
        checkGoals
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}
