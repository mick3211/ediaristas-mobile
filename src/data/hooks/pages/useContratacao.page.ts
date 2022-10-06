import { useContext, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSchemaService } from 'data/services/formSchemaService';
import {
    CadastroClienteFormDataInterface,
    LoginFormDataInterface,
    NovaDiariaFormDataInterface,
    PagamentoFormDataInterface,
} from 'data/@types/FormInterface';
import { ServicoInterface } from 'data/@types/ServicoInterface';
import { useApiHateoas } from '../useApi';
import { DiariaInterface } from 'data/@types/DiariaInterface';
import { ValidationService } from 'data/services/ValidationService';
import { DateService } from 'data/services/DateService';
import { houseParts } from '@partials/encontrar-diarista/_detalhes-servico';
import { ExternalServicesContext } from 'data/contexts/ExternalServicesContext';
import { ApiServiceHateoas, LinkResolver } from 'data/services/ApiService';
import { UserContext } from 'data/contexts/UserContext';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { TextFormatService } from 'data/services/TextFormatService';
import { LoginService } from 'data/services/LoginService';
import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { UserService } from 'data/services/UserService';
import { PaymentService } from 'data/services/PaymentService';

export function useContratacao() {
    const [step, setStep] = useState(1);
    const [hasLogin, setHasLogin] = useState(false);
    const [loginError, setLoginError] = useState('');
    const breadCrumbItems = ['Detalhes', 'Identificação', 'Pagamento'];
    const { userState, userDispacth } = useContext(UserContext);
    const { externalServicesState } = useContext(ExternalServicesContext);
    const servicos = useApiHateoas<ServicoInterface[]>(
        externalServicesState.externalServices,
        'listar_servicos'
    ).data;

    const serviceForm = useForm<NovaDiariaFormDataInterface>({
        resolver: yupResolver(
            FormSchemaService.address().concat(
                FormSchemaService.detalhesServico()
            )
        ),
    });

    const clientForm = useForm<CadastroClienteFormDataInterface>({
        resolver: yupResolver(
            FormSchemaService.userData().concat(FormSchemaService.newContact())
        ),
    });

    const loginForm = useForm<{ login: LoginFormDataInterface }>({
        resolver: yupResolver(FormSchemaService.login()),
    });

    const paymentForm = useForm<PagamentoFormDataInterface>({
        resolver: yupResolver(FormSchemaService.payment()),
    });

    const cepFaxina = serviceForm.watch('endereco.cep'),
        [podemosAtender, setPodemosAtender] = useState(true),
        [novaDiaria, setNovaDiaria] = useState({} as DiariaInterface);

    useEffect(() => {
        const cep = (cepFaxina || '').replace(/\D/g, '');
        if (ValidationService.cep(cep)) {
            ApiServiceHateoas(
                externalServicesState.externalServices,
                'verificar_disponibilidade_atendimento',
                (request) => {
                    request<{ disponibilidade: boolean }>({
                        params: { cep },
                    })
                        .then((resp) =>
                            setPodemosAtender(resp.data.disponibilidade)
                        )
                        .catch((err) => setPodemosAtender(false));
                }
            );
        } else setPodemosAtender(true);
    }, [cepFaxina]);

    const dadosFaxina = serviceForm.watch('faxina'),
        tipoLimpeza = useMemo<ServicoInterface>(() => {
            if (servicos && dadosFaxina?.servico) {
                const selectedService = servicos.find(
                    (servico) => servico.id === dadosFaxina.servico
                );
                if (selectedService) return selectedService;
            }
            return {} as ServicoInterface;
        }, [servicos, dadosFaxina?.servico]);

    const { totalTime, tamanhoCasa, totalPrice } = useMemo<{
        tamanhoCasa: string[];
        totalPrice: number;
        totalTime: number;
    }>(
        () => ({
            totalTime: calcularTempoServico(dadosFaxina, tipoLimpeza),
            tamanhoCasa: listarComodos(dadosFaxina),
            totalPrice: calcularPreco(dadosFaxina, tipoLimpeza),
        }),
        [
            tipoLimpeza,
            dadosFaxina,
            dadosFaxina?.quantidade_banheiros,
            dadosFaxina?.quantidade_cozinhas,
            dadosFaxina?.quantidade_outros,
            dadosFaxina?.quantidade_quartos,
            dadosFaxina?.quantidade_quintais,
            dadosFaxina?.quantidade_salas,
        ]
    );

    useEffect(() => {
        if (
            dadosFaxina &&
            ValidationService.hora(dadosFaxina.hora_inicio) &&
            totalTime >= 0
        ) {
            serviceForm.setValue(
                'faxina.hora_termino',
                DateService.addHours(
                    dadosFaxina.hora_inicio as string,
                    totalTime
                ),
                { shouldValidate: true }
            );
        } else {
            serviceForm.setValue('faxina.hora_termino', '');
        }
    }, [dadosFaxina?.hora_inicio, totalTime]);

    const onServiceFormSubmit: SubmitHandler<NovaDiariaFormDataInterface> = (
        data
    ) => {
        if (userState.user.nome_completo) {
            criarDiaria(userState.user);
        } else {
            setStep(2);
        }
    };

    const onClientFormSubmit: SubmitHandler<
        CadastroClienteFormDataInterface
    > = async (data) => {
        const newUserLink = LinkResolver(
            externalServicesState.externalServices,
            'cadastrar_usuario'
        );
        if (newUserLink) {
            try {
                await cadastrarUsuario(data, newUserLink);
            } catch (e) {
                UserService.handleNewUserError(e, clientForm);
            }
        }
    };

    async function cadastrarUsuario(
        data: CadastroClienteFormDataInterface,
        link: ApiLinksInterface
    ) {
        const newUser = await UserService.cadastrar(
            data.usuario,
            UserType.Cliente,
            link
        );
        if (newUser) {
            const loginSuccess = await login(
                {
                    email: data.usuario.email,
                    password: data.usuario.password || '',
                },
                newUser
            );
            if (loginSuccess) {
                criarDiaria(newUser);
            }
        }
    }

    const onLoginFormSubmit: SubmitHandler<{
        login: LoginFormDataInterface;
    }> = async (data) => {
        const loginSuccess = await login(data.login);
        if (loginSuccess) {
            const user = await LoginService.getUser();
            if (user) {
                criarDiaria(user);
                setStep(3);
            }
        }
    };

    async function login(
        credencials: LoginFormDataInterface,
        user?: UserInterface
    ): Promise<boolean> {
        const loginSuccess = await LoginService.login(credencials);
        if (loginSuccess) {
            // if (!user) {
            user = await LoginService.getUser();
            // }
            userDispacth({ type: 'SET_USER', payload: user });
        } else {
            setLoginError('E-mail e/ou senha inválido(s)');
        }
        return loginSuccess;
    }

    const onPaymentFormSubmit: SubmitHandler<
        PagamentoFormDataInterface
    > = async ({ pagamento }) => {
        console.log(pagamento);
        const cartao = {
            card_number: pagamento.numero_cartao.replaceAll(' ', ''),
            card_holder_name: pagamento.nome_cartao,
            card_cvv: pagamento.codigo,
            card_expiration_date: pagamento.validade,
        };

        const hash = await PaymentService.getHash(cartao);

        ApiServiceHateoas(novaDiaria.links, 'pagar_diaria', async (req) => {
            try {
                await req({
                    data: {
                        card_hash: hash,
                    },
                });

                setStep(4);
            } catch (e) {
                paymentForm.setError('pagamento.pagamento_recusado', {
                    type: 'manual',
                    message: 'Pagamento recusado',
                });
            }
        });
    };

    function listarComodos(dadosFaxina: DiariaInterface): string[] {
        const comodos: string[] = [];
        if (dadosFaxina) {
            houseParts.forEach((housePart) => {
                const total = dadosFaxina[
                    housePart.name as keyof DiariaInterface
                ] as number;
                if (total > 0) {
                    const nome =
                        total > 1 ? housePart.plural : housePart.singular;
                    comodos.push(`${total} ${nome}`);
                }
            });
        }
        return comodos;
    }

    function calcularTempoServico(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ) {
        let total = 0;
        if (dadosFaxina && tipoLimpeza) {
            total +=
                tipoLimpeza.horas_banheiro * dadosFaxina.quantidade_banheiros;
            total +=
                tipoLimpeza.horas_cozinha * dadosFaxina.quantidade_cozinhas;
            total += tipoLimpeza.horas_quarto * dadosFaxina.quantidade_quartos;
            total += tipoLimpeza.horas_sala * dadosFaxina.quantidade_salas;
            total += tipoLimpeza.horas_outros * dadosFaxina.quantidade_outros;
            total +=
                tipoLimpeza.horas_quintal * dadosFaxina.quantidade_quintais;
        }
        return total;
    }

    function calcularPreco(
        dadosFaxina: DiariaInterface,
        tipoLimpeza: ServicoInterface
    ) {
        let total = 0;
        if (dadosFaxina && tipoLimpeza) {
            total +=
                tipoLimpeza.valor_banheiro * dadosFaxina.quantidade_banheiros;
            total +=
                tipoLimpeza.valor_cozinha * dadosFaxina.quantidade_cozinhas;
            total += tipoLimpeza.valor_quarto * dadosFaxina.quantidade_quartos;
            total += tipoLimpeza.valor_sala * dadosFaxina.quantidade_salas;
            total += tipoLimpeza.valor_outros * dadosFaxina.quantidade_outros;
            total +=
                tipoLimpeza.valor_quintal * dadosFaxina.quantidade_quintais;
        }
        return Math.max(total, tipoLimpeza.valor_minimo);
    }

    async function criarDiaria(user: UserInterface) {
        if (user.nome_completo) {
            const serviceData = serviceForm.getValues();
            ApiServiceHateoas(
                user.links,
                'cadastrar_diaria',
                async (request) => {
                    try {
                        const novaDiaria = (
                            await request<DiariaInterface>({
                                data: {
                                    ...serviceData.endereco,
                                    ...serviceData.faxina,
                                    cep: TextFormatService.getNumbersFromText(
                                        serviceData.endereco.cep
                                    ),
                                    preco: totalPrice,
                                    tempo_atendimento: totalTime,
                                    data_atendimento:
                                        TextFormatService.reverseDate(
                                            serviceData.faxina
                                                .data_atendimento as string
                                        ) +
                                        'T' +
                                        serviceData.faxina.hora_inicio,
                                },
                            })
                        ).data;

                        if (novaDiaria) {
                            setStep(3);
                            setNovaDiaria(novaDiaria);
                        }
                    } catch (e) {}
                }
            );
        }
    }

    return {
        step,
        setStep,
        breadCrumbItems,
        serviceForm,
        clientForm,
        loginForm,
        paymentForm,
        onServiceFormSubmit,
        onClientFormSubmit,
        onLoginFormSubmit,
        onPaymentFormSubmit,
        servicos,
        hasLogin,
        setHasLogin,
        loginError,
        tamanhoCasa,
        tipoLimpeza,
        totalPrice,
        podemosAtender,
    };
}
