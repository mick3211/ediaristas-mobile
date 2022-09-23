import { OportunidadeInterface } from 'data/@types/OportunidadeInterface';
import { UserContext } from 'data/contexts/UserContext';
import { ApiServiceHateoas, LinkResolver } from 'data/services/ApiService';
import { useContext, useState } from 'react';
import { mutate } from 'swr';
import { useApiHateoas } from '../useApi';
import useIsMobile from '../useIsMobile';
import { usePagination } from '../usePagination.hook';

export function useOportunidadesPage() {
    const isMobile = useIsMobile();
    const [oportunidadeSelecionada, setOportunidadeselecionada] =
        useState<OportunidadeInterface>();
    const [menssagemSnackbar, setMessagemSnackbar] = useState('');
    const { userState } = useContext(UserContext);
    const oportunidades =
        useApiHateoas<OportunidadeInterface[]>(
            userState.user.links,
            'lista_oportunidades'
        ).data || ([] as OportunidadeInterface[]);
    const { currentPage, itemsPerPage, setCurrentPage, totalPages } =
        usePagination(oportunidades || [], 5);

    function totalComodos(oportunidade: OportunidadeInterface) {
        let total = 0;
        total += oportunidade.quantidade_banheiros;
        total += oportunidade.quantidade_cozinhas;
        total += oportunidade.quantidade_quartos;
        total += oportunidade.quantidade_quintais;
        total += oportunidade.quantidade_salas;
        total += oportunidade.quantidade_outros;

        return total;
    }

    const podeCandidatar = (oportunidade: OportunidadeInterface) => {
        return LinkResolver(oportunidade.links, 'candidatar_diaria');
    };

    const seCandidatar = async (oportunidade: OportunidadeInterface) => {
        ApiServiceHateoas(
            oportunidade.links,
            'candidatar_diaria',
            async (req) => {
                try {
                    await req();
                    setMessagemSnackbar('Candidatura enviada');
                    setOportunidadeselecionada(undefined);
                    atualizarOportunidades();
                } catch (err) {
                    console.log(err);
                }
            }
        );
    };

    function atualizarOportunidades() {
        mutate('lista_oportunidades');
    }

    return {
        isMobile,
        oportunidades,
        currentPage,
        itemsPerPage,
        setCurrentPage,
        totalPages,
        oportunidadeSelecionada,
        setOportunidadeselecionada,
        seCandidatar,
        menssagemSnackbar,
        setMessagemSnackbar,
        totalComodos,
        podeCandidatar,
    };
}
