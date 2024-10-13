import React, { ReactNode, createContext, useReducer } from 'react';
import { ADD_IDEA, DEL_IDEA, Idea, IdeaContextType } from '../reducers/ideaTypes';
import { ideaReducer } from '../reducers/ideaReducer';

export const IdeaContext = createContext<IdeaContextType>({
    ideas: [],
    addIdea: (todo: Idea) => { },
    delIdea: (todo: Idea) => { },
});

interface TaskContextProviderProps {
    children: ReactNode
}

export function IdeaContextProvider({ children }: TaskContextProviderProps) {

    const [ideas, dispatch] = useReducer(ideaReducer, []);

    function addIdea(todo: Idea) {
        dispatch({ type: ADD_IDEA, payload: todo });
    };

    function delIdea(todo: Idea) {
        dispatch({ type: DEL_IDEA, payload: todo });
    };

    return (
        <IdeaContext.Provider
            value={{
                ideas,
                addIdea,
                delIdea
            }}>
            {children}
        </IdeaContext.Provider>
    );
};