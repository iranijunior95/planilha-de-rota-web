function indexEmployees(req, res) {
    return res.renderLayout("/funcionarios/index", {
        titulo: "Funcionários",
        linkActive: "funcionarios",
        scripts: ['funcionarios/indexFuncionarios.js']
    });
}

export default {
    indexEmployees
}