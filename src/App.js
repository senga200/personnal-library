import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./containers/Home";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
