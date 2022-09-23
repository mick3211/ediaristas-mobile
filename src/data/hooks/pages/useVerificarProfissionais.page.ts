import { UserShortInformationInterface } from 'data/@types/UserInterface';
import { ApiService } from 'data/services/ApiService';
import { ValidationService } from 'data/services/ValidationService';
import { useMemo, useState } from 'react';

export default function useVerificarProfissionais() {
    const [cep, setCep] = useState(''),
        [error, setError] = useState(''),
        [buscaFeita, setBuscaFeita] = useState(false),
        [isLoading, setIsLoading] = useState(false),
        [diaristas, setDiaristas] = useState<UserShortInformationInterface[]>(
            []
        ),
        [diaristasRestantes, setDiaristasRestantes] = useState(0);
    const cepValido = useMemo(() => ValidationService.cep(cep), [cep]);

    async function buscarProfissionais(cep: string) {
        type responseType = {
            diaristas: UserShortInformationInterface[];
            quantidade_diaristas: number;
        };

        setBuscaFeita(false);
        setIsLoading(true);
        setError('');

        try {
            const { data } = await ApiService.get<responseType>(
                `/api/diaristas/localidades?cep=${cep.replace(/\D/g, '')}`
            );

            setBuscaFeita(true);
            setDiaristas(data.diaristas);
            setDiaristasRestantes(data.quantidade_diaristas);
        } catch (e) {
            setError('CEP não encontrado');
        } finally {
            setIsLoading(false);
        }
    }

    return {
        cep,
        setCep,
        cepValido,
        buscarProfissionais,
        error,
        diaristas,
        buscaFeita,
        isLoading,
        diaristasRestantes,
    };
}
