import Funcionario from "../../models/Funcionario.js";

async function getAll(req, res) {
    try {
        const funcionarios = await Funcionario.find({ status: true }).sort({ funcao: -1 });

        if (funcionarios.length === 0) {
            return res.status(200).json({
                status: true,
                message: "Nenhum funcionário encontrado",
                funcionarios: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Funcionários encontrados com sucesso",
            funcionarios
        });

    } catch (error) {
        console.log(`Erro ao buscar funcionários: ${error}`);

        return res.status(500).json({ 
            status: false, 
            message: "Erro no servidor ao buscar funcionários" 
        });
    }
}

async function getById(req, res) {
    const { id } = req.params;

    try {
        const dadosFuncionario = await Funcionario.findById(id);

        if (!dadosFuncionario) {
            return res.status(404).json({
                status: false,
                message: "Funcionário não localizado"
            });
        }

         return res.status(200).json({
                status: true,
                message: "Funcionário localizado com sucesso",
                funcionario: dadosFuncionario
        });

    } catch (error) {
        console.log(`Erro ao buscar funcionário: ${error}`);

        return res.status(500).json({ 
            status: false, 
            message: "Erro no servidor ao buscar funcionário" 
        });
    }
}

async function search(req, res) {
    const { nome, funcao } = req.body;
    const filter = { status: true };

    if (nome) filter.nome = { $regex: nome, $options: 'i' };
    if (funcao && funcao === 'motorista' || funcao === 'ajudante') filter.funcao = funcao;

    try {
        const funcionarios = await Funcionario.find(filter).sort({ funcao: -1 });

        if (funcionarios.length === 0) {
            return res.status(200).json({
                status: true,
                message: "Nenhum funcionário encontrado",
                funcionarios: []
            });
        }

        return res.status(200).json({
            status: true,
            message: "Funcionários encontrados com sucesso",
            funcionarios
        });

    } catch (error) {
        console.log(`Erro ao buscar funcionários: ${error}`);

        return res.status(500).json({ 
            status: false, 
            message: "Erro no servidor ao buscar funcionários" 
        });
    }
}

async function save(req, res) {
    const { nome, funcao } = req.body;

    try {
        const novoFuncionario = await Funcionario.create({
            nome: nome.toLocaleLowerCase(),
            funcao: funcao.toLocaleLowerCase(),
            status: true
        });

        return res.status(201).json({
            status: true,
            message: "Funcionário cadastrado com sucesso",
            funcionario: novoFuncionario
        });

    } catch (error) {
        console.log(`Erro ao inserir novo funcionário: ${error}`);

        return res.status(500).json({
            status: false,
            message: "Erro interno ao inserir funcionário"
        });
    }
}

export default {
    getAll,
    getById,
    save,
    search
}