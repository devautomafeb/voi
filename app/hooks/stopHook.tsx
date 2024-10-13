import React, { ReactNode, createContext, useReducer } from 'react';
import { ADD_STOP, DEL_STOP, Stop, StopContextType } from '../reducers/stopTypes';
import { stopReducer } from '../reducers/stopReducer';


export const StopContext = createContext<StopContextType>({
    stops: [],
    addStop: (todo: Stop) => { },
    delStop: (todo: Stop) => { },
});

interface TaskContextProviderProps {
    children: ReactNode
}

export function StopContextProvider({ children }: TaskContextProviderProps) {

    const [stops, dispatch] = useReducer(stopReducer, []);

    function addStop(todo: Stop) {
        dispatch({ type: ADD_STOP, payload: todo });
    };

    function delStop(todo: Stop) {
        dispatch({ type: DEL_STOP, payload: todo });
    };

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
};