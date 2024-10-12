import React, { ReactNode, createContext, useReducer, useEffect } from 'react';
import { ADD_GOAL, CHECK_GOAL, DEL_GOAL, Goal, GoalContextType, INIT_GOALS } from '../reducers/goalTypes';
import { goalReducer } from '../reducers/goalReducer';
import Realm from "realm";
import { GoalSchema, ProjectDataSchema } from '../model/Project';  // Importar schemas

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

  useEffect(() => {
    let realm;

    try {
      // Inicializar o Realm apenas uma vez no efeito
      realm = new Realm({ schema: [GoalSchema, ProjectDataSchema] });
      
      // Carregar os dados do Realm e inicializar o estado
      const realmGoals = realm.objects('Goal');
      const initialGoals = Array.from(realmGoals);
      dispatch({ type: INIT_GOALS, payload: initialGoals });
    } catch (error) {
      console.error("Erro ao inicializar o Realm ou carregar os dados:", error);
    }

    // Fechar o Realm quando o componente for desmontado
    return () => {
      if (realm) {
        realm.close();
      }
    };
  }, []);

  function addGoals(todo: Goal) {
    try {
      const realm = new Realm({ schema: [GoalSchema, ProjectDataSchema] });
      realm.write(() => {
        realm.create('Goal', todo);
      });
      dispatch({ type: ADD_GOAL, payload: todo });
    } catch (error) {
      console.error("Erro ao adicionar Goal:", error);
    }
  }

  function delGoals(todo: Goal) {
    try {
      const realm = new Realm({ schema: [GoalSchema, ProjectDataSchema] });
      realm.write(() => {
        const goalToDelete = realm.objectForPrimaryKey('Goal', todo.id);
        if (goalToDelete) {
          realm.delete(goalToDelete);
        }
      });
      dispatch({ type: DEL_GOAL, payload: todo });
    } catch (error) {
      console.error("Erro ao deletar Goal:", error);
    }
  }

  function checkGoals(todo: Goal) {
    try {
      const realm = new Realm({ schema: [GoalSchema, ProjectDataSchema] });
      realm.write(() => {
        const goalToCheck = realm.objectForPrimaryKey('Goal', todo.id);
        if (goalToCheck) {
          goalToCheck.completed = true;
        }
      });
      dispatch({ type: CHECK_GOAL, payload: todo });
    } catch (error) {
      console.error("Erro ao verificar Goal:", error);
    }
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
