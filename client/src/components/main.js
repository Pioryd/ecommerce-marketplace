import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navigation from "./navigation";
import Content from "./content";
import Footer from "./footer";

import Account from "../pages/account";
import AccountAuctions from "../pages/account_auctions";
import AccountFallowing from "../pages/account_fallowing";
import AccountNewAuction from "../pages/account_new_auction";
import AccountSettings from "../pages/account_settings";
import Auctions from "../pages/auctions";

function Main() {
  return (
    <BrowserRouter>
      <Navigation />
      <Content>
        <Switch>
          <Route exact path="/">
            <Auctions />
          </Route>
          <Route path="/auctions">
            <Auctions />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/account-auctions">
            <AccountAuctions />
          </Route>
          <Route path="/account-fallowing">
            <AccountFallowing />
          </Route>
          <Route path="/account-new-auction">
            <AccountNewAuction />
          </Route>
          <Route path="/account-settings">
            <AccountSettings />
          </Route>
        </Switch>
      </Content>
      <Footer />
    </BrowserRouter>
  );
}

export default Main;
