import React, { useState, useEffect } from "react";
import UserStatusComponent from "./components/UserStatusComponent";
import DataFetchComponent from "./components/DataFetchComponent";
import DebounceComponent from "./components/DebounceComponent";
import IntervalComponent from "./components/IntervalComponent";
function App() {
  return (
    <div>
      <UserStatusComponent></UserStatusComponent>
      <DataFetchComponent></DataFetchComponent>
      <DebounceComponent></DebounceComponent>
      <IntervalComponent></IntervalComponent>
    </div>
  );
}

export default App;
