export const ADD_GOAL = 'ADD_GOAL';
export const DEL_GOAL = 'DEL_GOAL';
export const CHECK_GOAL = 'CHECK_GOAL';
export const INIT_GOALS = 'INIT_GOALS';  // Adicione esta linha

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
  completed?: boolean;  // Corrigido para 'boolean'
}

export type GoalContextType = {
  goals: Goal[];  // Adicione a propriedade 'goals' ao contexto
  addGoals: (goal: Goal) => void;  // Corrigido 'todo' para 'goal'
  delGoals: (goal: Goal) => void;  // Corrigido 'todo' para 'goal'
  checkGoals: (goal: Goal) => void;  // Corrigido 'todo' para 'goal'
}
