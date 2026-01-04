# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Deploying to GitHub Pages (quick steps)

1. Install the `gh-pages` package:

   ```bash
   npm install --save-dev gh-pages
   ```

2. Build and deploy:

   ```bash
   npm run deploy
   ```

3. In your repository settings on GitHub, enable **Pages** and select the `gh-pages` branch (the `dist` folder is pushed there automatically by the deploy script).

Notes:
- `vite.config.js` was updated to use a relative `base: './'` so the site works when served from GitHub Pages.
- If you prefer to use a GitHub Action instead of `gh-pages`, you can use `peaceiris/actions-gh-pages` to build and publish on push to `main`.
