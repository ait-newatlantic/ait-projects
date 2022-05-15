import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import Login from "./components/Login";
import { Navigation } from "./components/Navigation";
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>
      {location.pathname !== "/" && <Navigation />}
      <Layout />
    </>
  );
};
export default App;
