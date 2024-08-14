import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import publicRoutes from "./routers/publicRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          if (route.children) {
            return route.children.map((child, idx) => (
              <Route
                key={`${index}-${idx}`}
                path={`${route.path}/${child.path}`}
                element={child.element}
              />
            ));
          }
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
