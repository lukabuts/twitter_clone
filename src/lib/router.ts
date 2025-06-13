import type { NavigateFunction } from "react-router-dom";

// Store the navigate function from react-router
let routerNavigate: NavigateFunction | null = null;

// Export a function to set the navigate function
export const setRouterNavigate = (navigate: NavigateFunction) => {
  routerNavigate = navigate;
};

// Export the navigate function to use throughout the app
export const navigate = (to: string) => {
  if (routerNavigate) {
    routerNavigate(to);
  } else {
    console.warn(
      "Router not initialized yet - falling back to window.location"
    );
    window.location.href = to;
  }
};
