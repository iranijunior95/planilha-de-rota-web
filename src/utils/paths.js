import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho raiz do projeto (subindo 1 nível a partir de /src/utils)
const rootDir = path.resolve(__dirname, "..");

export { rootDir };