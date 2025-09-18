[Leia isto em Português / Read this in Portuguese](README.pt-BR.md)

# React Performance Demo with `useMemo`

This project is a simple React application built to demonstrate the performance impact of the `useMemo` hook in a practical and visual way. The application renders a component that performs a computationally "heavy" calculation, allowing the user to toggle `useMemo` on and off to compare the difference in UI responsiveness.

## What the Code Does

The application consists of two main components: `App` and `HeavyComponent`.

1.  **`App.js` (Main Component):**

    - Manages the application's global state, including a list of numbers, a click counter, and a boolean to enable/disable `useMemo` mode.
    - Renders the main interface, which includes:
      - A **"Click fast!"** button: Increments a click counter. This button is used to test UI responsiveness. If the app is slow, the counter will not update smoothly.
      - An **"Add number"** button: Adds a new number to the list.
      - An **"Enable useMemo"** checkbox: Controls whether the optimized or unoptimized version of the calculation runs in `HeavyComponent`.
      - A list displaying the current numbers.
    - It renders the `HeavyComponent`, passing the list of numbers and the `useMemo` mode as props.

2.  **`HeavyComponent.js` (Heavy Calculation Component):**
    - This component receives the list of numbers (`numbers`) and the `useMemo` mode (`useMemoMode`).
    - Its main purpose is to calculate the sum of all received numbers. However, to simulate a truly expensive operation, the `computeSum` function first runs a giant `for` loop (200 million iterations) before summing the numbers.
    - **The core logic is here**:
      - If `useMemoMode` is `false`, the `computeSum()` function is called directly on **every single render** of `HeavyComponent`.
      - If `useMemoMode` is `true`, the result of `computeSum()` is "memoized" using the `useMemo` hook. This means the heavy calculation will only be re-executed if its dependency—the `numbers` array—changes.

## How to Test the Performance Difference

1.  **Run the application.**
2.  **Keep the "Enable useMemo" checkbox unchecked.**
3.  Click the **"Click fast! Counter: ..."** button rapidly. You will notice that the UI is slow and laggy. The click counter takes a while to update.
    - **Why does this happen?** Every time you click the button, the `clicks` state in the `App` component is updated, causing a re-render. Since `HeavyComponent` is a child of `App`, it also re-renders. Without `useMemo`, the `computeSum` function (with its 200 million-iteration loop) is executed on every click, blocking the main JavaScript thread and freezing the UI.
4.  **Now, check the "Enable useMemo" checkbox.**
5.  Click the **"Click fast!"** button rapidly again. You will see that the UI is extremely responsive, and the counter updates instantly.
    - **Why does this happen?** With `useMemo` enabled, the sum's result is cached. When you click the button, the `App` and `HeavyComponent` still re-render. However, React sees that the dependency of `useMemo` (the `numbers` prop) has not changed. Therefore, instead of re-running the `computeSum` function, it returns the value that was already calculated and stored, avoiding the heavy computation and keeping the UI fluid.
6.  Click the **"Add number"** button. You will notice a slight delay. This happens because the `numbers` array has changed, forcing `useMemo` to re-run the heavy calculation, which is the expected behavior.

## Conclusion

This example perfectly illustrates the purpose of `useMemo`: it is an optimization tool to avoid expensive calculations on subsequent renders when the calculation's dependencies have not changed. By "memoizing" (remembering) the result, it prevents heavy operations from impacting the user interface's responsiveness during unnecessary re-renders.
