import { Outlet } from "react-router-dom";
import Menu from "./menu";
import Header from "./header";
import Footer from "./footers";
import { BackTop } from "antd";

export default function LayoutIndex() {
  return (
    <>
      <div className="ra-admin-layout">
        <BackTop visibilityHeight={1000}/> 
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
