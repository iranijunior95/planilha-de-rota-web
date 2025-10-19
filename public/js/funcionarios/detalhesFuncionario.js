document.addEventListener('DOMContentLoaded', async () => { 
    const $btnEditar = document.querySelector('#btn-editar');
    const $inputNome = document.querySelector('#inputNome');
    const $selectFuncao = document.querySelector('#selectFuncao');
    const $inputId = document.querySelector('#inputId');
    const $helpNome = document.querySelector('#helpNome');
    const $tdNome = document.querySelector('#tdNome');
    const $tdFuncao = document.querySelector('#tdFuncao');
    const $btnCancelar = document.querySelector('#btn-cancelar');
    const $btnSalvar = document.querySelector('#btn-salvar');

    async function buscarFuncionarioPeloId() {
        const idFuncionario = window.location.pathname.split("/")[3];

        try {
            const response = await fetch(`/api/funcionarios/${idFuncionario}`);

            if (!response.ok) {
                console.log(`Erro ao buscar funcionário: $${response.statusText}`);

                return false;
            }

            const data = await response.json();

            return data.funcionario;

        } catch (error) {
            console.log(`Erro ao buscar funcionário: ${error}`);

            return false;
        }
    }

    function atualizaDadosFuncionario(dados) {
        $inputNome.value = dados.nome;
        $selectFuncao.value = dados.funcao;
        $inputId.value = dados._id;

        $tdNome.textContent = dados.nome.toLocaleUpperCase();
        $tdFuncao.innerHTML = `<span class="badge ${dados.funcao === "motorista" ? 'badge-info' : 'badge-warning' }">${ dados.funcao }</span>`;
    }

    function desabilitarElementosModal(status, tipoModal='salvar') {
        let modal = '';

        if (tipoModal === 'salvar') {
            modal = document.querySelector('#modalFuncionarios');
        } else {
            modal = document.querySelector('#modalFiltrosFuncionarios');
        }
        
        const campos = modal.querySelectorAll('input, select, button');

        if (status) {
            campos.forEach(campo => {
                campo.disabled = true;
                campo.classList.add('disabled');
            });

        } else {
            campos.forEach(campo => {
                campo.disabled = false;
                campo.classList.remove('disabled');
            });
        }
    }

    function validarDadosFormulario() {
        if ($inputNome.value === '') {
            $helpNome.textContent = 'Campo nome é obrigatório!';

            return false;
        }

        $helpNome.textContent = '';
        return true;
    }

    $btnEditar.addEventListener('click', async () => {
        atualizaDadosFuncionario(await buscarFuncionarioPeloId());
        $helpNome.textContent = '';

        $('#modalFuncionarios').modal('show');
    });

    $btnSalvar.addEventListener('click', async () => {
        if (!validarDadosFormulario()) return;

        desabilitarElementosModal(true);

        try {
            const response = await fetch(`/api/funcionarios/${$inputId.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: $inputNome.value,
                    funcao: $selectFuncao.value
                })
            });

            if (!response.ok) {
                console.log(`Erro ao alterar funcionário: ${response.statusText}`);

                $('#modalFuncionarios').modal('hide');
                alertSystem('Erro ao alterar funcionário, tente novamente mais tarde!', false);

                return;
            }

            const dados = await response.json();

            atualizaDadosFuncionario(dados.funcionario);
            
            $('#modalFuncionarios').modal('hide');
            alertSystem('Funcionário alterado com sucesso!', true);

        } catch (error) {
            console.log(`Erro ao alterar funcionário: ${error}`);

            $('#modalFuncionarios').modal('hide');
            alertSystem('Erro ao alterar funcionário, tente novamente mais tarde!', false);
        }

        desabilitarElementosModal(false);
    });

    $btnCancelar.addEventListener('click', () => $('#modalFuncionarios').modal('hide'));

    atualizaDadosFuncionario(await buscarFuncionarioPeloId());
});