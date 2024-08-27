import React, { ReactNode, createContext, useReducer, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_IDEA, DEL_IDEA, Idea, IdeaContextType } from '../reducers/ideaTypes';
import { ideaReducer } from '../reducers/ideaReducer';

export const IdeaContext = createContext<IdeaContextType>({
    ideas: [],
    addIdea: (todo: Idea) => { },
    delIdea: (todo: Idea) => { },
});

interface IdeaContextProviderProps {
    children: ReactNode
}

export function IdeaContextProvider({ children }: IdeaContextProviderProps) {
    const [ideas, dispatch] = useReducer(ideaReducer, []);
    const [loading, setLoading] = useState(true);

    // Load ideas from AsyncStorage on component mount
    useEffect(() => {
        const loadIdeas = async () => {
            try {
                const storedIdeas = await AsyncStorage.getItem('ideas');
                if (storedIdeas) {
                    dispatch({ type: 'INIT_IDEAS', payload: JSON.parse(storedIdeas) });
                }
            } catch (error) {
                console.error('Failed to load ideas from storage:', error);
            } finally {
                setLoading(false);
            }
        };
        loadIdeas();
    }, []);

    // Save ideas to AsyncStorage whenever the ideas state changes
    useEffect(() => {
        const saveIdeas = async () => {
            try {
                await AsyncStorage.setItem('ideas', JSON.stringify(ideas));
            } catch (error) {
                console.error('Failed to save ideas to storage:', error);
            }
        };
        if (!loading) {
            saveIdeas();
        }
    }, [ideas, loading]);

    function addIdea(todo: Idea) {
        dispatch({ type: ADD_IDEA, payload: todo });
    }

    function delIdea(todo: Idea) {
        dispatch({ type: DEL_IDEA, payload: todo });
    }

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
}
