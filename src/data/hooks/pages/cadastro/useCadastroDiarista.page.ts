import { yupResolver } from '@hookform/resolvers/yup';
import { ApiLinksInterface } from 'data/@types/ApiLinksInterface';
import { EnderecoInterface } from 'data/@types/EnderecoInterface';
import { CadastroDiaristaFormDataInterface } from 'data/@types/FormInterface';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { ExternalServicesContext } from 'data/contexts/ExternalServicesContext';
import {
    ApiService,
    ApiServiceHateoas,
    LinkResolver,
} from 'data/services/ApiService';
import { FormSchemaService } from 'data/services/formSchemaService';
import { LocalStorage } from 'data/services/StorageService';
import { TextFormatService } from 'data/services/TextFormatService';
import { UserService } from 'data/services/UserService';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export function useCadastroDiarista() {
    const [step, setStep] = useState(1);
    const [isWaitingResponse, setIsWaitingResponse] = useState(false);
    const [newUser, setNewUser] = useState<UserInterface>();
    const [newAddress, setNewAddress] = useState<EnderecoInterface>();
    const [sucessoCadastro, setSucessoCadastro] = useState(false);
    const breadcrumbItems = ['Identificação', 'Cidades Atendidas'];
    const userForm = useForm<CadastroDiaristaFormDataInterface>({
        resolver: yupResolver(
            FormSchemaService.userData()
                .concat(FormSchemaService.address())
                .concat(FormSchemaService.newContact())
        ),
    });
    const addressListForm = useForm<CadastroDiaristaFormDataInterface>();
    const enderecosAtendidos = addressListForm.watch('enderecosAtendidos');
    const { externalServicesState } = useContext(ExternalServicesContext);

    const onUserSubmit: SubmitHandler<
        CadastroDiaristaFormDataInterface
    > = async (data) => {
        setIsWaitingResponse(true);

        const newUserLink = LinkResolver(
            externalServicesState.externalServices,
            'cadastrar_usuario'
        );

        if (newUserLink) {
            try {
                await cadastrarUsuario(data, newUserLink);
            } catch (err) {
                handleUserError(err);
            }
        }
    };

    const cadastrarUsuario = async (
        data: CadastroDiaristaFormDataInterface,
        link: ApiLinksInterface
    ) => {
        const newUser = await UserService.cadastrar(
            data.usuario,
            UserType.Diarista,
            link
        );

        if (newUser) {
            setNewUser(newUser);
            cadastrarEndereco(data, newUser);
            setIsWaitingResponse(false);
            setStep(2);
        }
    };

    const handleUserError = async (err: any) => {
        UserService.handleNewUserError(err, userForm);
        setIsWaitingResponse(false);
    };

    const cadastrarEndereco = async (
        data: CadastroDiaristaFormDataInterface,
        newUser: UserInterface
    ) => {
        ApiService.defaults.headers.common['Authorization'] =
            'Bearer ' + newUser?.token?.access;

        LocalStorage.set('token', newUser.token?.access);
        LocalStorage.set('token_refresh', newUser.token?.refresh);

        ApiServiceHateoas(newUser.links, 'cadastrar_endereco', async (req) => {
            const newAddress = (
                await req<EnderecoInterface>({
                    data: {
                        ...data.endereco,
                        cep: TextFormatService.getNumbersFromText(
                            data.endereco.cep
                        ),
                    },
                })
            ).data;

            console.log('newAddress', newAddress);

            if (newAddress) setNewAddress(newAddress);
        });
    };

    const onAddressSubmit = async (data: CadastroDiaristaFormDataInterface) => {
        if (newUser) {
            ApiServiceHateoas(
                newUser.links,
                'relacionar_cidades',
                async (req) => {
                    try {
                        setIsWaitingResponse(true);
                        await req({
                            data: {
                                cidades: data.enderecosAtendidos,
                            },
                        });
                        setSucessoCadastro(true);
                        setIsWaitingResponse(false);
                    } catch (e) {}
                }
            );
        }
    };

    return {
        step,
        breadcrumbItems,
        userForm,
        addressListForm,
        isWaitingResponse,
        onUserSubmit,
        onAddressSubmit,
        newAddress,
        sucessoCadastro,
        enderecosAtendidos,
    };
}
