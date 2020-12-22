import { BrowserRouter, Switch, Route } from "react-router-dom";

import AccountRoute from "./Routes/Account";

import Navigation from "./Navigation";
import Content from "./Content";
import Footer from "./Footer";

import Account from "../pages/Account";
import AccountSelling from "../pages/AccountSelling";
import AccountWatchlist from "../pages/AccountWatchlist";
import AccountListItem from "../pages/AccountListItem";
import AccountSettings from "../pages/AccountSettings";
import Items from "../pages/Items";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Content>
        <Switch>
          <Route exact path="/" component={Items} />
          <Route path="/items" component={Items} />
          <AccountRoute exact path="/account" component={Account} />
          <AccountRoute
            exact
            path="/account/selling"
            component={AccountSelling}
          />
          <AccountRoute
            exact
            path="/account/watchlist"
            component={AccountWatchlist}
          />
          <AccountRoute
            exact
            path="/account/list-item"
            component={AccountListItem}
          />
          <AccountRoute
            exact
            path="/account/settings"
            component={AccountSettings}
          />
        </Switch>
      </Content>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
