export interface ServicoInterface {
    id: number;
    nome: string;
    icone: string;
    horas_banheiro: number;
    horas_cozinha: number;
    horas_quarto: number;
    horas_quintal: number;
    horas_sala: number;
    horas_outros: number;
    qtd_horas: number;
    valor_minimo: number;
    valor_banheiro: number;
    valor_cozinha: number;
    valor_quarto: number;
    valor_quintal: number;
    valor_sala: number;
    valor_outros: number;
    porcentagem_comissao: number;
}
