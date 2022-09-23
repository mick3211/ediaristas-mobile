import { UserContext } from 'data/contexts/UserContext';
import useIsMobile from 'data/hooks/useIsMobile';
import { usePagination } from 'data/hooks/usePagination.hook';
import { useContext, useMemo, useState } from 'react';
import { useApiHateoas } from '../useApi';
import {
    PagamentoInterface,
    PagamentoStatus,
} from 'data/@types/PagamentoInterface';

export function usePagamentos() {
    const [filtro, setFiltro] = useState('pendentes');
    const isMobile = useIsMobile();
    const { userState } = useContext(UserContext);
    const pagamentos = useApiHateoas<PagamentoInterface[]>(
        userState.user.links,
        'lista_pagamentos'
    ).data;
    const filteredData = useMemo(
        () => filtrarPagamentos(pagamentos || [], filtro),
        [pagamentos, filtro]
    );
    const { currentPage, itemsPerPage, setCurrentPage, totalPages } =
        usePagination(filteredData, 5);

    function alterarFiltro(filtro: string) {
        setFiltro(filtro);
        setCurrentPage(1);
    }

    function filtrarPagamentos(
        pagamentos: PagamentoInterface[],
        filtro: string
    ) {
        return pagamentos.filter((pagamento) => {
            switch (filtro) {
                case 'pago':
                    return pagamento.status === PagamentoStatus.Pago;
                case 'aguardando':
                    return (
                        pagamento.status ===
                        PagamentoStatus.Aguardando_Transferencia
                    );
                default:
                    return pagamento;
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
        filtro,
        alterarFiltro,
    };
}
