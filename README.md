[Leia isto em Português / Read this in Portuguese](README.pt-BR.md)

# React Performance Playground

This project is an interactive web application built to demonstrate key React performance optimization techniques in a practical and visual way. Instead of relying on console logs, this playground uses animations and real-world simulations to show the impact of optimization on UI responsiveness and load times.

### [➡️ Live Demo Link Here ⬅️](https://react-demo-performance.vercel.app/)

---

## Demos Included

This application is divided into three distinct demonstrations, each focusing on a common performance bottleneck.

### 1. `useMemo`

This demo simulates a component with an expensive, blocking calculation. You can toggle `useMemo` on and off to see its direct impact on UI responsiveness.

- **Without `useMemo`**: Clicking the "Re-render" button causes the entire UI to freeze until the heavy calculation is complete.
- **With `useMemo`**: The UI remains fast and responsive because the expensive calculation is skipped, and the cached result is used instead.

### 2. `React.memo` + `useCallback`

This demo illustrates why passing functions as props can break optimizations and how `useCallback` solves it. A child component is wrapped in `React.memo` to prevent unnecessary re-renders.

- **Without `useCallback`**: A new function is created on every parent render. `React.memo` sees a new prop and is forced to re-render the child component, which is highlighted with a red flash.
- **With `useCallback`**: The exact same function instance is passed as a prop. `React.memo` correctly identifies that the props haven't changed and skips the re-render.

### 3. `React.lazy` + `Suspense`

This demo shows how to improve initial page load times by code-splitting and loading large components only when they are needed.

- **How it works**: The demo features a "Super Heavy Component" (which includes the `lodash` library to increase its file size). This component is not included in the initial JavaScript bundle. When you click the "Load" button, you can watch the new JavaScript "chunk" being downloaded in your browser's Network tab. Instructions are provided to simulate a slow network to make the effect more obvious.

---

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Simulation**: `lodash` is used to simulate a large dependency for the lazy loading demo.

## How to Run Locally

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy ).
