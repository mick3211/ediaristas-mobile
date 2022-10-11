import { MinhasDiarias } from '@partials/diarias/_minhas-diarias';
import { DiariaProvider } from 'data/contexts/DiariasContext';

export const Diarias: React.FC = () => {
    return (
        <DiariaProvider>
            <MinhasDiarias />
        </DiariaProvider>
    );
};
