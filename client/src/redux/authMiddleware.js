import jwt_decode from "jwt-decode";
import * as AccountActions from "./modules/account/actions";

const authMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  try {
    const token = localStorage.getItem("token");

    if (token == null) return;
    if (getState().account.token == null) return;

    const { exp, iat } = jwt_decode(token);
    const now_seconds = Math.floor(Date.now() / 1000);

    const leftSecondsToLogout = 300;
    const leftSecondsToRefresh = (exp - iat) / 2;
    const diff = exp - now_seconds;

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
