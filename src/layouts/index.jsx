import { Outlet } from "react-router-dom";
import Menu from "./menu";
import Header from "./header";
import Footer from "./footers";

export default function LayoutIndex() {
  return (
    <>
      <div className="ra-admin-layout">
        <Menu />
        <div className="right">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}
