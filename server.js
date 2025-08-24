import { fileURLToPath, pathToFileURL } from "node:url";
import express from "express";
import fs from "fs";
import path from "node:path";
import process from "node:process";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV?.trim() === "production";

async function createServer() {
  const app = express();

  let vite;
  if (isProd) {
    app.use(
      express.static(path.resolve(__dirname, "dist/client"), {
        index: false,
      })
    );
  } else {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  }

  app.use("*all", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const indexFile = isProd
        ? path.resolve(__dirname, "dist/client/index.html")
        : path.resolve(__dirname, "index.html");

      let template = fs.readFileSync(indexFile, "utf-8");

      if (!isProd) {
        // Dev: transform HTML with Vite
        template = await vite.transformIndexHtml(url, template);
      }

      // Load the SSR module
      const { render } = isProd
        ? await import(
            pathToFileURL(path.resolve(__dirname, "dist/server/ssr.js")).href
          )
        : await vite.ssrLoadModule("/src/ssr.jsx");

      const appHtml = await render(url);

      // Inject SSR app into template
      const html = template.replace("<!--ssr-outlet-->", () => appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      if (!isProd) vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

createServer();
