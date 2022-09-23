import { ExternalServicesContext } from 'data/contexts/ExternalServicesContext';
import { ApiServiceHateoas } from 'data/services/ApiService';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

export function useRecuperarSenha() {
    const router = useRouter();
    const token = router.query.token || '';
    const { externalServicesState } = useContext(ExternalServicesContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mensagemSnack, setMensagemSnack] = useState('');

    function pedirTokenRecuperacao() {
        if (email.length > 8) {
            ApiServiceHateoas(
                externalServicesState.externalServices,
                'solicitar_alteracao_senha',
                (req) => {
                    req({ data: { email } });
                    setMensagemSnack(
                        'Uma mensagem foi enviada ao email informado para recuperação da senha'
                    );
                }
            );
        } else {
        }
        setMensagemSnack('Digite um email válido');
    }

    async function resetarSenha() {
        if (email.length < 8) {
            setMensagemSnack('Digite um email válido');
            return;
        }
        if (senha.length < 8) {
            setMensagemSnack('Senha muito curta');
            return;
        }
        if (senha !== confirmarSenha) {
            setMensagemSnack('As senhas não coincidem');
            return;
        }
        ApiServiceHateoas(
            externalServicesState.externalServices,
            'confirmar_alteracao_senha',
            async (req) => {
                try {
                    await req({ data: { email, password: senha, token } });
                    setMensagemSnack('Senha alterada');
                } catch (e) {
                    setMensagemSnack(
                        'Não foi possível resetar a senha, tente novamente'
                    );
                }
            }
        );
    }

    return {
        router,
        email,
        setEmail,
        pedirTokenRecuperacao,
        mensagemSnack,
        setMensagemSnack,
        senha,
        setSenha,
        confirmarSenha,
        setConfirmarSenha,
        resetarSenha,
    };
}
