import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navigation from "./navigation";
import Content from "./content";
import Footer from "./footer";

import About from "../pages/about";
import Contact from "../pages/contact";
import Gallery from "../pages/gallery";
import Menu from "../pages/menu";
import Cart from "../pages/cart";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Content>
        <Switch>
          <Route exact path="/">
            <About />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/gallery">
            <Gallery />
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Switch>
      </Content>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
