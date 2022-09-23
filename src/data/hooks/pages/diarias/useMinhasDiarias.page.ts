import { DiariaInterface, DiariaStatus } from 'data/@types/DiariaInterface';
import { DiariaContext } from 'data/contexts/DiariasContext';
import useIsMobile from 'data/hooks/useIsMobile';
import { usePagination } from 'data/hooks/usePagination.hook';
import { ApiServiceHateoas, LinkResolver } from 'data/services/ApiService';
import { useContext, useMemo, useState } from 'react';
import { mutate } from 'swr';

export function useMinhasDiarias() {
    const [diariaConfirmar, setDiariaConfirmar] = useState(
        {} as DiariaInterface
    );
    const [diariaAvaliar, setDiariaAvaliar] = useState({} as DiariaInterface);
    const [diariaCancelar, setDiariaCancelar] = useState({} as DiariaInterface);
    const [filtro, setFiltro] = useState('pendentes');
    const isMobile = useIsMobile();
    const { diariaState } = useContext(DiariaContext);
    const { diarias } = diariaState;
    const filteredData = useMemo(
        () => filtrarDiarias(diarias, filtro),
        [diarias, filtro]
    );
    const { currentPage, itemsPerPage, setCurrentPage, totalPages } =
        usePagination(filteredData, 5);

    function alterarFiltro(filtro: string) {
        setFiltro(filtro);
        setCurrentPage(1);
    }

    function podeVisualizar(diaria: DiariaInterface): boolean {
        return LinkResolver(diaria.links, 'self') !== undefined;
    }

    function podeCancelar(diaria: DiariaInterface): boolean {
        return LinkResolver(diaria.links, 'cancelar_diaria') !== undefined;
    }

    function podeConfirmar(diaria: DiariaInterface): boolean {
        return LinkResolver(diaria.links, 'confirmar_diarista') !== undefined;
    }

    function podeAvaliar(diaria: DiariaInterface): boolean {
        return LinkResolver(diaria.links, 'avaliar_diaria') !== undefined;
    }

    async function confirmarDiarista(diaria: DiariaInterface) {
        ApiServiceHateoas(diaria.links, 'confirmar_diarista', async (req) => {
            try {
                await req();
                setDiariaConfirmar({} as DiariaInterface);
                atualizarListaDiarias();
            } catch (e) {
                console.error(e);
            }
        });
    }

    async function avaliarDiaria(
        diaria: DiariaInterface,
        avaliacao: { descricao: string; nota: number }
    ) {
        ApiServiceHateoas(diaria.links, 'avaliar_diaria', async (req) => {
            try {
                await req({
                    data: avaliacao,
                });
                setDiariaAvaliar({} as DiariaInterface);
                atualizarListaDiarias();
            } catch (e) {
                console.error(e);
            }
        });
    }

    async function cancelarDiaria(diaria: DiariaInterface, motivo: string) {
        ApiServiceHateoas(diaria.links, 'cancelar_diaria', async (req) => {
            try {
                await req({
                    data: { motivo_cancelamento: motivo },
                });
                setDiariaCancelar({} as DiariaInterface);
                atualizarListaDiarias();
            } catch (e) {
                console.error(e);
            }
        });
    }

    function atualizarListaDiarias() {
        mutate('lista_diarias');
    }

    function filtrarDiarias(diarias: DiariaInterface[], filtro: string) {
        return diarias.filter((diaria) => {
            const avaliada = [DiariaStatus.AVALIADO].includes(
                diaria.status as DiariaStatus
            );
            const cancelada = [
                DiariaStatus.CANCELADO,
                DiariaStatus.SEM_PAGAMENTO,
            ].includes(diaria.status as DiariaStatus);
            const pendente = [
                DiariaStatus.PAGO,
                DiariaStatus.CONFIRMADO,
                DiariaStatus.CONCLUIDO,
            ].includes(diaria.status as DiariaStatus);

            switch (filtro) {
                case 'avaliadas':
                    return avaliada;
                case 'pendentes':
                    return pendente;
                case 'canceladas':
                    return cancelada;
            }
        });
    }

    return {
        isMobile,
        currentPage,
        itemsPerPage,
        setCurrentPage,
        totalPages,
        filteredData,
        podeVisualizar,
        diariaConfirmar,
        setDiariaConfirmar,
        podeConfirmar,
        confirmarDiarista,
        diariaAvaliar,
        setDiariaAvaliar,
        podeAvaliar,
        avaliarDiaria,
        diariaCancelar,
        setDiariaCancelar,
        podeCancelar,
        cancelarDiaria,
        filtro,
        alterarFiltro,
    };
}
