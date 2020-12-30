import { BrowserRouter, Switch, Route } from "react-router-dom";

import AccountRoute from "./Routes/Account";

import Navigation from "./Layout/Navigation";
import Content from "./Layout/Content";
import Footer from "./Layout/Footer";

import NotFound from "../components/NotFound";

import Account from "../pages/Account";
import AccountSelling from "../pages/AccountSelling";
import AccountSold from "../pages/AccountSold";
import AccountUnsold from "../pages/AccountUnsold";
import AccountWatchlist from "../pages/AccountWatchlist";
import AccountListItem from "../pages/AccountListItem";
import AccountSettings from "../pages/AccountSettings";
import Items from "../pages/Items";
import Item from "../pages/Item";
import AccountSignIn from "../pages/AccountSignIn";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Content>
        <Switch>
          <Route exact path="/" component={Items} />
          <Route exact path="/items" component={Items} />
          <Route exact path="/item/:id" component={Item} />
          <AccountRoute exact path="/account" component={Account} />
          <AccountRoute
            exact
            path="/account/sign-in"
            component={AccountSignIn}
          />
          <AccountRoute
            exact
            path="/account/selling"
            component={AccountSelling}
          />
          <AccountRoute exact path="/account/sold" component={AccountSold} />
          <AccountRoute
            exact
            path="/account/unsold"
            component={AccountUnsold}
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
          <Route path="*" component={NotFound} />
        </Switch>
      </Content>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
