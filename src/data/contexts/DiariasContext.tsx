import {
    DiariaReducerInterface,
    initialState,
    UseDiariaReducer,
} from 'data/reducers/DiariasReducer';
import { createContext } from 'react';

const initialValue: DiariaReducerInterface = {
    diariaState: initialState,
    diariaDispatch: () => {},
};

export const DiariaContext = createContext(initialValue);

export const DiariaProvider: React.FC = ({ children }) => {
    const reducer = UseDiariaReducer();

    return (
        <DiariaContext.Provider value={reducer}>
            {children}
        </DiariaContext.Provider>
    );
};
