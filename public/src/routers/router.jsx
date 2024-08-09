import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./publicRoute";
import privateRoutes from "./privateRoute";

// Lấy tất cả các route bên trong public và private
const routes = createBrowserRouter([...publicRoutes, ...privateRoutes]);

export default routes;