import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { EnderecoInterface } from 'data/@types/EnderecoInterface';
import { CadastroDiaristaFormDataInterface } from 'data/@types/FormInterface';
import { UserInterface, UserType } from 'data/@types/UserInterface';
import { UserContext } from 'data/contexts/UserContext';
import { ApiServiceHateoas } from 'data/services/ApiService';
import { FormSchemaService } from 'data/services/formSchemaService';
import { ObjectService } from 'data/services/ObjectService';
import { TextFormatService } from 'data/services/TextFormatService';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export function useAlterarDados() {
    const {
        userState: { user, userAddres },
        userDispacth,
    } = useContext(UserContext);
    const formMethods = useForm<CadastroDiaristaFormDataInterface>({
        resolver: getResolver(),
    });
    const [picture, setPicture] = useState('');
    const [snackMessage, setSnackMessage] = useState('');

    useEffect(() => {
        setPicture(user.foto_usuario || '');
    }, [user]);

    function getResolver() {
        let resolver = FormSchemaService.userData().concat(
            FormSchemaService.Contact()
        );
        if (user.tipo_usuario === UserType.Diarista) {
            resolver = resolver.concat(FormSchemaService.address());
        }
        return yupResolver(resolver);
    }

    function onPictureChange(event: ChangeEvent) {
        const target = event.target as HTMLInputElement;
        const files = target.files;

        if (files !== null && files.length > 0) {
            const file = files[0];
            setPicture(URL.createObjectURL(file));
        }
    }

    async function updatePicture() {
        ApiServiceHateoas(user.links, 'alterar_foto_usuario', async (req) => {
            const fileList = formMethods.getValues('usuario.foto_usuario');

            if (fileList && fileList.length > 0) {
                const fotoUsuario = fileList[0];
                try {
                    const userData = ObjectService.jsonToFormData({
                        foto_usuario: fotoUsuario,
                    });
                    await req<UserInterface>({
                        data: userData,
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                } catch (e) {}
            }
        });
    }

    async function updateUserAddress(data: CadastroDiaristaFormDataInterface) {
        ApiServiceHateoas(user.links, 'editar_endereco', async (req) => {
            const endereco = {
                ...data.endereco,
                cep: TextFormatService.getNumbersFromText(data.endereco.cep),
            };

            try {
                await req<EnderecoInterface>({ data: endereco });
                userDispacth({ type: 'SET_USER_ADDRESS', payload: endereco });
            } catch (e) {
                console.log(e);
            }
        });
    }

    async function updateUserCitiesList(
        data: CadastroDiaristaFormDataInterface
    ) {
        ApiServiceHateoas(user.links, 'relacionar_cidades', async (req) => {
            try {
                await req<EnderecoInterface>({
                    data: { cidades: data.enderecosAtendidos },
                });
                userDispacth({
                    type: 'SET_ADRESS_LIST',
                    payload: data.enderecosAtendidos,
                });
            } catch (e) {
                console.log(e);
            }
        });
    }

    async function updateUser(data: CadastroDiaristaFormDataInterface) {
        ApiServiceHateoas(user.links, 'editar_usuario', async (req) => {
            const endereco = {
                ...data.endereco,
                cep: TextFormatService.getNumbersFromText(data.endereco.cep),
            };

            try {
                const nascimento = TextFormatService.dateToString(
                    data.usuario.nascimento as Date
                );
                const cpf = TextFormatService.getNumbersFromText(
                    data.usuario.cpf
                );
                const telefone = TextFormatService.getNumbersFromText(
                    data.usuario.telefone
                );
                const userData = {
                    ...data.usuario,
                    nascimento,
                    cpf,
                    telefone,
                };
                delete userData.foto_usuario;
                if (
                    !userData.password ||
                    !userData.password_confirmation ||
                    !userData.new_password
                ) {
                    delete userData.password;
                    delete userData.password_confirmation;
                    delete userData.new_password;
                }
                const updatedUser = (
                    await req<UserInterface>({ data: userData })
                ).data;
                userDispacth({
                    type: 'SET_USER',
                    payload: { ...user, ...updatedUser },
                });
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    if ((e?.response?.data as { password: string }).password) {
                        formMethods.setError('usuario.password', {
                            type: 'invalida',
                            message: 'senha inválida',
                        });
                    }
                }
            }
        });
    }

    async function onSubmit(data: CadastroDiaristaFormDataInterface) {
        await updatePicture();
        await updateUser(data);

        if (user.tipo_usuario === UserType.Diarista) {
            await Promise.all([
                updateUserAddress(data),
                updateUserCitiesList(data),
            ]);
        }

        setSnackMessage('Dados atualizados');
    }

    return {
        formMethods,
        user,
        userAddres,
        picture,
        onPictureChange,
        snackMessage,
        setSnackMessage,
        onSubmit,
    };
}
