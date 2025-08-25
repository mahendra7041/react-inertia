import express from "express";
import router from "./app/router.js";
import { inertiaMiddleware } from "./app/utils/inertia.js";

async function bootstrap() {
  const app = express();
  const PORT = process.env.PORT || 5000;
  const isProd = process.env.NODE_ENV === "production";

  app.use(express.static("public"));

  if (isProd) {
    app.use(
      express.static("build/client", {
        index: false,
      })
    );
  }

  app.use(inertiaMiddleware);

  app.use(router);

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

bootstrap();
