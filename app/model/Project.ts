import Realm from "realm";

// Definir o schema para ProjectData
export const ProjectDataSchema = {
  name: 'ProjectData',
  properties: {
    name: 'string',
    description: 'string',
  },
};

// Definir o schema para Goal
export const GoalSchema = {
  name: 'Goal',
  properties: {
    id: 'int',  // O campo 'id' é um número inteiro
    project: 'ProjectData',  // Relacionamento com o schema ProjectData
    importance: 'string',  // O campo 'importance' é uma string
    startDate: 'date',  // O campo 'startDate' é uma data
    endDate: 'date',  // O campo 'endDate' é uma data
    completed: { type: 'bool', default: false },  // O campo 'completed' é booleano
  },
  primaryKey: 'id',  // A chave primária do schema é o campo 'id'
};

// Inicialização do Realm agora será feita no contexto ou useEffect, não aqui.
