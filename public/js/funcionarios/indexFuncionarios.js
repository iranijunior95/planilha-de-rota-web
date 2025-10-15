document.addEventListener('DOMContentLoaded', async () => {
    const $tbodyTableFuncionarios = document.querySelector('#tbody-table-funcionarios');
    const $btnCadastrar = document.querySelector('#btn-cadastrar');
    const $btnDetalhes = document.querySelector('#btn-detalhes');
    const $btnFiltrar = document.querySelector('#btn-filtrar');
    const $inputNome = document.querySelector('#inputNome');
    const $selectFuncao = document.querySelector('#selectFuncao');
    const $inputId = document.querySelector('#inputId');
    const $helpNome = document.querySelector('#helpNome');
    const $btnSalvar = document.querySelector('#btn-salvar');
    const $btnCancelar = document.querySelector('#btn-cancelar');
    const $inputNomeFiltro = document.querySelector('#inputNomeFiltro');
    const $selectFuncaoFiltro = document.querySelector('#selectFuncaoFiltro');
    const $btnFiltroBuscar = document.querySelector('#btn-filtro-buscar');
    const $btnFiltroCancelar = document.querySelector('#btn-filtro-cancelar');

    let checkFuncionarioMarcado = '0';

    async function buscarListaDeFuncionarios() {
        renderizarTabelaDeFuncionarios('buscar');

        try {
            const response = await fetch(`/api/funcionarios`);

            if (!response.ok) {
                console.error(`Erro ao buscar funcionários: ${response.statusText}`);

                return [];
            }

            const data = await response.json();

            return data.funcionarios;

        } catch (error) {
            console.error(`Erro na requisição: ${error}`);

            return [];
        }
    }

    function renderizarTabelaDeFuncionarios(status = '', lista = []) {
        switch (status) {
            case 'renderizar':
                if (lista.length === 0) {
                    $tbodyTableFuncionarios.innerHTML = `<tr>
                                                            <td colspan="4" class="text-center">Nenhum registro encontrado...</td>
                                                        </tr>`;
                    return;
                }

                let contadorId = 1;
                let listaRenderizada = '';

                lista.forEach((funcionario) => {
                    listaRenderizada += `<tr>
                                            <th class="text-center">${contadorId++}</th>
                                            <td class="text-center">
                                                <input type="checkbox" value="${funcionario._id}" name="checkFuncionario">
                                            </td>
                                            <td class="text-center">${funcionario.nome.toLocaleUpperCase()}</td>
                                            <td class="text-center"><span class="badge ${funcionario.funcao === "motorista" ? 'badge-info' : 'badge-warning'}">${funcionario.funcao}</span></td>
                                        </tr>`;
                });

                $tbodyTableFuncionarios.innerHTML = listaRenderizada;

                break;

            case 'buscar':
                $tbodyTableFuncionarios.innerHTML = `<tr>
                                                        <td colspan="4" class="text-center">Buscando...</td>
                                                    </tr>`;
                break;

            default:
                $tbodyTableFuncionarios.innerHTML = `<tr>
                                                        <td colspan="4" class="text-center">Nenhum registro encontrado...</td>
                                                    </tr>`;
                break;
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

    $btnCadastrar.addEventListener('click', () => {
        $inputNome.value = '';
        $selectFuncao.value = 'motorista';
        $inputId.value = '0';
        $helpNome.textContent = '';

        $('#modalFuncionarios').modal('show');
    });

    $btnSalvar.addEventListener('click', async () => {
        if (!validarDadosFormulario()) return;

        desabilitarElementosModal(true);

        try {
            const response = await fetch('/api/funcionarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: $inputNome.value,
                    funcao: $selectFuncao.value
                })
            });

            if (!response.ok) {
                console.log(`Erro ao salvar funcionário: ${response.statusText}`);

                $('#modalFuncionarios').modal('hide');
                alertSystem('Erro ao salvar funcionário, tente novamente mais tarde!', false);

                return;
            }

            const dados = await response.json();

            renderizarTabelaDeFuncionarios('renderizar', await buscarListaDeFuncionarios());

            $('#modalFuncionarios').modal('hide');
            alertSystem(`Funcionário cadastrado com sucesso! <a href="/funcionarios/detalhes/${dados.funcionario._id}">Ver Detalhes</a>?`, true);

        } catch (error) {
            console.log(`Erro ao salvar funcionário: ${error}`);

            $('#modalFuncionarios').modal('hide');
            alertSystem('Erro ao salvar funcionário, tente novamente mais tarde!', false);
        }

        desabilitarElementosModal(false);
    });

    $btnCancelar.addEventListener('click', () => $('#modalFuncionarios').modal('hide'));

    $btnDetalhes.addEventListener('click', () => {
        if (checkFuncionarioMarcado === '0') return;

        window.location.href = `/funcionarios/detalhes/${checkFuncionarioMarcado}`;
    });

    $btnFiltrar.addEventListener('click', () => $('#modalFiltrosFuncionarios').modal('show'));

    $btnFiltroBuscar.addEventListener('click', async () => {
        desabilitarElementosModal(true, 'filtrar');
        renderizarTabelaDeFuncionarios('buscar');

        try {
            const response = await fetch('/api/funcionarios/filtrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: $inputNomeFiltro.value,
                    funcao: $selectFuncaoFiltro.value
                })
            });

            if (!response.ok) {
                console.log(`Erro ao buscar funcionário: ${response.statusText}`);

                alertSystem('Erro ao buscar funcionário, tente novamente mais tarde!', false);

                return;
            }
            
            const dados = await response.json();

            renderizarTabelaDeFuncionarios('renderizar', dados.funcionarios);

        } catch (error) {
            console.log(`Erro ao buscar funcionário: ${error}`);

            alertSystem('Erro ao buscar funcionário, tente novamente mais tarde!', false);
        }

        desabilitarElementosModal(false, 'filtrar');
    });

    $btnFiltroCancelar.addEventListener('click', () => $('#modalFiltrosFuncionarios').modal('hide'));

    $tbodyTableFuncionarios.addEventListener('change', (event) => {
        if (event.target.name === "checkFuncionario") {
            const allCheckboxes = $tbodyTableFuncionarios.querySelectorAll('input[name="checkFuncionario"]');
            const arrayChecked = [];

            allCheckboxes.forEach(chk => {
                if (chk !== event.target) chk.checked = false;

                arrayChecked.push(chk.checked);
            });

            const arrayValidation = arrayChecked.every(check => check === false);

            if (!arrayValidation) {
                checkFuncionarioMarcado = event.target.value;
            } else {
                checkFuncionarioMarcado = '0';
            }
        }
    });

    renderizarTabelaDeFuncionarios('renderizar', await buscarListaDeFuncionarios());
});

