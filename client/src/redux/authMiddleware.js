import jwt_decode from "jwt-decode";
import * as AccountActions from "./modules/account/actions";

const authMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  try {
    const token = localStorage.getItem("token");

    if (token == null) return;
    if (getState().account.token == null) return;

    const token_seconds = jwt_decode(token).exp;
    const now_seconds = Math.floor(Date.now() / 1000);
    const diff = token_seconds - now_seconds;

    const leftSecondsToLogout = 300;
    const leftSecondsToRefresh = token_seconds / 2;

    if (diff <= leftSecondsToLogout) {
      dispatch(AccountActions.signOut());
    } else if (diff < leftSecondsToRefresh) {
      dispatch(AccountActions.refreshToken());
    }
  } catch (err) {
    console.log(err);
  } finally {
    next(action);
  }
};

export default authMiddleware;
