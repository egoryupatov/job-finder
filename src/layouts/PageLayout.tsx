import { Outlet } from "react-router";
import { Header } from "../components/Header";

export const PageLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
