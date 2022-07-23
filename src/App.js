import { BrowserRouter, Route, Routes } from "react-router-dom";

//pages
import { BasketPage } from "./pages/basket-page/BasketPage";
import { Stores } from "./pages/stores/Stores";
import { PokemonPage } from "./pages/pokemon-page/PokemonPage";
import { HomePage } from "./pages/home/HomePage";

//providers
import { BasketProvider } from "./context/basket-context";

//components
import NavBar from "./components/navbar/desktop/NavBar";

function App() {
  return (
    <BasketProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stores/:type" element={<Stores />} />
          <Route path="/stores/pokemon/:id" element={<PokemonPage />} />
          <Route path="/basket" element={<BasketPage />} />
        </Routes>
      </BrowserRouter>
    </BasketProvider>
  );
}
export default App;
