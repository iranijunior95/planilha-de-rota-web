import mongoose from "mongoose";
import { DB_CONNECTION_STRING } from "./environmentVariables.js";

async function connectDatabase() {
    try {
        await mongoose.connect(DB_CONNECTION_STRING);

        console.log(`🟢 Banco de Dados conectado com sucesso!`);

    } catch (error) {
        console.log(`🔴 Erro ao conectar ao Banco de Dados: ${error}`);
    }
}

export default connectDatabase;