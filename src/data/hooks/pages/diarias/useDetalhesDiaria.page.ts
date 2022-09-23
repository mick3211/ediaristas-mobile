import { DiariaInterface } from 'data/@types/DiariaInterface';
import { UserInterface } from 'data/@types/UserInterface';
import { DiariaContext } from 'data/contexts/DiariasContext';
import { ApiServiceHateoas } from 'data/services/ApiService';
import { useContext, useEffect, useState } from 'react';

export function useDetalhesDiaria(diariaId: string) {
    const { diariaState } = useContext(DiariaContext);
    const { diarias } = diariaState;
    const [diaria, setDiaria] = useState({} as DiariaInterface);
    const [cliente, setCliente] = useState({} as UserInterface);
    const [diarista, setDiarista] = useState({} as UserInterface);

    useEffect(() => {
        if (diarias.length > 0) {
            getDiaria(diarias, diariaId);
        }
    }, [diarias, diariaId]);

    async function getDiaria(diarias: DiariaInterface[], diariaId: string) {
        const diariaSelecionada = diarias.find(
            (diaria) => diaria.id === Number(diariaId)
        );

        if (diariaSelecionada) {
            ApiServiceHateoas(diariaSelecionada.links, 'self', async (req) => {
                const diariaCompleta = (await req<DiariaInterface>()).data;

                if (diariaCompleta) {
                    setDiaria(diariaCompleta);
                    diariaCompleta.diarista &&
                        setDiarista(diariaCompleta.diarista);
                    diariaCompleta.cliente &&
                        setCliente(diariaCompleta.cliente);
                }
            });
        }
    }

    return {
        diaria,
        cliente,
        diarista,
    };
}
