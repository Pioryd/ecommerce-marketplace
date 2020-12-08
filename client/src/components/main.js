import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navigation from "./navigation";
import Content from "./content";
import Footer from "./footer";

import Account from "../pages/account";
import AccountItems from "../pages/account_selling";
import AccountWatchlist from "../pages/account_watchlist";
import AccountListItem from "../pages/account_list_item";
import AccountSettings from "../pages/account_settings";
import Items from "../pages/items";

function Main() {
  return (
    <BrowserRouter>
      <Navigation />
      <Content>
        <Switch>
          <Route exact path="/">
            <Items />
          </Route>
          <Route path="/items">
            <Items />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/account-selling">
            <AccountItems />
          </Route>
          <Route path="/account-watchlist">
            <AccountWatchlist />
          </Route>
          <Route path="/account-list-item">
            <AccountListItem />
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
