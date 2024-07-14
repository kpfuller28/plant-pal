import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Body from "./Components/Body";

function App() {
  return (
    <>
      <div className="h-screen">
        <Header />
        <Body />
        <Footer />
      </div>
    </>
  );
}

export default App;
