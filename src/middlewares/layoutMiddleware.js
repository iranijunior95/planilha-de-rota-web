import ejs from "ejs";
import path from "path";
import { rootDir } from "../utils/paths.js";

export function layoutMiddleware(req, res, next) {
    res.renderLayout = async (page, data = {}, layout = "main") => {
        try {
            const pagePath = path.join(rootDir, "views", "pages", `${page}.ejs`);
            const layoutPath = path.join(rootDir, "views", "layouts", `${layout}.ejs`);

            // Renderiza o conteúdo da página
            const content = await ejs.renderFile(pagePath, { ...res.locals, ...data });

            // Renderiza o layout principal, injetando o conteúdo
            const html = await ejs.renderFile(layoutPath, { ...res.locals, ...data, body: content });

            res.send(html);

        } catch (error) {
            console.error("Erro ao renderizar layout:", error);

            return res.status(500).send("Erro ao renderizar página.");
        }
    }

    next();
}

