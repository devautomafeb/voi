
export const ADD_GOAL = 'ADD_GOAL';
export const DEL_GOAL = 'DEL_GOAL';
export const CHECK_GOAL = 'CHECK_GOAL';

export type projectData = {
  name: string,
  description: string
}

export type Goal = {
    id: number;
    project: projectData;
    importance: string;
    startDate: Date;
    endDate: Date;
    completed?:false;
    // Outros atributos do Todo
  }
  
  export type GoalContextType = {
    goals: Goal[];
    addGoals: (todo: Goal) => void;
    delGoals: (todo: Goal) => void,
    checkGoals: (todo: Goal) => void,
  }