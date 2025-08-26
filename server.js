import express from "express";
import { inertiaMiddleware } from "express-inertia";
import { createServer } from "vite";

async function bootstrap() {
  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(express.static("public"));

  if (process.env.NODE_ENV === "production") {
    app.use(
      express.static("build/client", {
        index: false,
      })
    );
  }

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);

  const config = {
    encryptHistory: true,
    client: {
      entrypoint: "index.html",
      bundle: "build/client/index.html",
    },
    ssr: {
      entrypoint: "src/ssr.jsx",
      bundle: "src/ssr/ssr.js",
    },
  };

  app.use(inertiaMiddleware(config, vite));

  app.get("/", (req, res) => {
    res.inertia.render("home");
  });

  app.get("/about", (req, res) => {
    res.inertia.render("about");
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

bootstrap();
