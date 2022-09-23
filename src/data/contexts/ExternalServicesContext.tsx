import {
    ExternalServiceReducerInterface,
    initialState,
    useExternalServicesReducer,
} from 'data/reducers/ExternalServicesReducer';
import { createContext } from 'react';

const initialValue: ExternalServiceReducerInterface = {
    externalServicesState: initialState,
    externalServicesDispacth: () => {},
};

export const ExternalServicesContext = createContext(initialValue);

export const ExternalServicesProvider: React.FC = ({ children }) => {
    const reducer = useExternalServicesReducer();

    return (
        <ExternalServicesContext.Provider value={reducer}>
            {children}
        </ExternalServicesContext.Provider>
    );
};
