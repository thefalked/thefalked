import { createRootRoute, Outlet } from "@tanstack/react-router";
import { RootLayout } from "../components/root-layout";

export const Route = createRootRoute({
  component: () => (
    <>
      <RootLayout />
      <Outlet />
    </>
  ),
});
