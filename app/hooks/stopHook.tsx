import React, { ReactNode, createContext, useReducer, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_STOP, DEL_STOP, Stop, StopContextType } from '../reducers/stopTypes';
import { stopReducer } from '../reducers/stopReducer';

export const StopContext = createContext<StopContextType>({
    stops: [],
    addStop: (todo: Stop) => { },
    delStop: (todo: Stop) => { },
});

interface StopContextProviderProps {
    children: ReactNode
}

export function StopContextProvider({ children }: StopContextProviderProps) {
    const [stops, dispatch] = useReducer(stopReducer, []);
    const [loading, setLoading] = useState(true);

    // Load stops from AsyncStorage on component mount
    useEffect(() => {
        const loadStops = async () => {
            try {
                const storedStops = await AsyncStorage.getItem('stops');
                if (storedStops) {
                    dispatch({ type: 'INIT_STOPS', payload: JSON.parse(storedStops) });
                }
            } catch (error) {
                console.error('Failed to load stops from storage:', error);
            } finally {
                setLoading(false);
            }
        };
        loadStops();
    }, []);

    // Save stops to AsyncStorage whenever the stops state changes
    useEffect(() => {
        const saveStops = async () => {
            try {
                await AsyncStorage.setItem('stops', JSON.stringify(stops));
            } catch (error) {
                console.error('Failed to save stops to storage:', error);
            }
        };
        if (!loading) {
            saveStops();
        }
    }, [stops, loading]);

    function addStop(todo: Stop) {
        dispatch({ type: ADD_STOP, payload: todo });
    }

    function delStop(todo: Stop) {
        dispatch({ type: DEL_STOP, payload: todo });
    }

    return (
        <StopContext.Provider
            value={{
                stops,
                addStop,
                delStop
            }}>
            {children}
        </StopContext.Provider>
    );
}
