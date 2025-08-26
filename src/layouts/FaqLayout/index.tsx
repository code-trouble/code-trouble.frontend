import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export function FaqLayout() {
  return (
    <>
      <Header theme="base" />
      <Outlet />
      <Footer />
    </>
  );
}
