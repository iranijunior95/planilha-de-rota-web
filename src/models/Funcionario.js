import mongoose from "mongoose";

const FuncionarioSchema = new mongoose.Schema({
    nome: { 
        type: String,
        required: true 
    },
    funcao: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
});

const Funcionario = mongoose.model('funcionario', FuncionarioSchema);

export default Funcionario;