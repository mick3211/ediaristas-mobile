import {
    UserReducerInterface,
    initialState,
    useUserReducer,
} from 'data/reducers/UserReducer';
import { createContext } from 'react';

const initialValue: UserReducerInterface = {
    userState: initialState,
    userDispacth: () => {},
};

export const UserContext = createContext(initialValue);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const reducer = useUserReducer();

    return (
        <UserContext.Provider value={reducer}>{children}</UserContext.Provider>
    );
};
