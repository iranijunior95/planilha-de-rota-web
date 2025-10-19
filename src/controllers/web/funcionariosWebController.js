import Funcionario from "../../models/Funcionario.js";

function indexEmployees(req, res) {
    return res.renderLayout("/funcionarios/index", {
        titulo: "Funcionários",
        linkActive: "funcionarios",
        scripts: ['funcionarios/indexFuncionarios.js']
    });
}

async function employeeDetails(req, res) {
    const { id } = req.params;

    try {
        const dadosFuncionario = await Funcionario.findById(id);

        if (!dadosFuncionario) {
            return res.renderLayout("/error", {
                titulo: "Erro",
                linkActive: "erro",
                messageErro: 'Erro! Funcionário não localizado, tente novamente mais tarde!'
            });
        }

        return res.renderLayout("/funcionarios/detalhes", {
            titulo: "Funcionários",
            linkActive: "funcionarios",
            dadosFuncionario,
            scripts: ['funcionarios/detalhesFuncionario.js']
        });

    } catch (error) {
        console.log(`Erro ao buscar funcionário: ${error}`);

        return res.renderLayout("/error", {
            titulo: "Erro",
            linkActive: "erro",
            messageErro: 'Erro ao buscar funcionário, tente novamente mais tarde!'
        });
    }
}

export default {
    indexEmployees,
    employeeDetails
}