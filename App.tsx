// App.tsx
import React from "react";
import { ServingAreasProvider } from "./ServingAreasProvider";
import { ServingAreasList } from "./ServingAreasList";

function App() {
  return (
    <ServingAreasProvider>
      <h1>Serving Areas</h1>
      <ServingAreasList />
    </ServingAreasProvider>
  );
}

export default App;