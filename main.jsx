import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Isso pega a div#root do index.html e manda o React desenhar
// o componente <App /> dentro dela. É a "porta de entrada" do projeto.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
