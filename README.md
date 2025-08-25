# React + Express + Inertia Starter Template

A starter template to build modern single-page applications with **Express.js**, **Inertia.js**, and **React**, pre-configured with **Vite** and SSR support.

---

## 🚀 Quick Start

### 1. Create a New Project Using the Template

```bash
npx degit mahendra7041/react-inertia my-inertia-app
```

Replace `my-inertia-app` with your desired project name.

### 2. Install Dependencies

```bash
cd my-inertia-app
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:5000` to see the app running.

---

## 📦 Project Structure

```
my-inertia-app/
├── build/                 # Generated build artifacts (client & SSR)
├── configs/
│   └── inertia.config.js  # Inertia.js configuration
├── app/
│   ├── router.js          # Express routes
│   └── utils/
├── public/                # Static assets
├── src/
│   ├── pages/             # Inertia page components
│   ├── assets/
│   ├── main.jsx           # Client entry point
│   └── ssr.jsx            # SSR entry point
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
└── server.js              # Express server entry point
```

---

## ⚡ Scripts

```json
"scripts": {
  "dev": "nodemon server.js",
  "build": "npm run build:client && npm run build:ssr",
  "build:client": "vite build --outDir build/client --ssrManifest",
  "build:ssr": "vite build --outDir build/ssr --ssr src/ssr.jsx",
  "serve": "NODE_ENV=production node server.js"
}
```

---

## License

MIT © 2025 Mahendra Chavda
