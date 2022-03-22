import logo from "./logo.svg";
import "./App.css";
import ProductList from "./pages/ProductList";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<ProductList />} />
        <Route exact path={`/product/:id`} element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
