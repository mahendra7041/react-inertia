export const inertiaConfig = {
  encryptHistory: true,
  client: {
    entrypoint: "index.html",
    bundle: "build/client/index.html",
  },
  ssr: {
    entrypoint: "src/ssr.jsx",
    bundle: "build/ssr/ssr.js",
  },
};
