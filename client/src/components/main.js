import { BrowserRouter, Switch, Route } from "react-router-dom";

import AccountRoute from "../components/routes/account";

import Navigation from "./navigation";
import Content from "./content";
import Footer from "./footer";

import Account from "../pages/account";
import AccountSelling from "../pages/account_selling";
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
          <Route exact path="/" component={Items} />
          <Route path="/items" component={Items} />
          <AccountRoute path="/account" component={Account} />
          <AccountRoute path="/account-selling" component={AccountSelling} />
          <AccountRoute
            path="/account-watchlist"
            component={AccountWatchlist}
          />
          <AccountRoute path="/account-list-item" component={AccountListItem} />
          <AccountRoute path="/account-settings" component={AccountSettings} />
        </Switch>
      </Content>
      <Footer />
    </BrowserRouter>
  );
}

export default Main;
