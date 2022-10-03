import { ExternalServicesProvider } from './ExternalServicesContext';
import { UserProvider } from './UserContext';

export const MainProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <>
            <ExternalServicesProvider>
                <UserProvider>{children}</UserProvider>
            </ExternalServicesProvider>
        </>
    );
};
