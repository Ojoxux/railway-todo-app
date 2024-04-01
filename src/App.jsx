import React from "react";
import "./App.scss";
import { Router } from "./routes/Router";
import { UIProvider } from "@yamada-ui/react";
//import { UIProvider } from "@yamada-ui/react";

function App() {
  return (
    <UIProvider>
      <div className="App">
        <Router />
      </div>
    </UIProvider>
  );
}

export default App;
