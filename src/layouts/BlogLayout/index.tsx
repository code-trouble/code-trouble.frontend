import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export function BlogLayout() {
  return (
    <>
      <Header theme="blue" />
      <Outlet />
      <Footer />
    </>
  );
}
